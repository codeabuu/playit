from django.shortcuts import render
from rest_framework import status, generics
import uuid
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services import PaystackService
from .models import Campaign, Donation, RecurringDonation
from django.conf import settings
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from datetime import timedelta
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
import json
from django.db.models import Sum
from decimal import Decimal
from .serializers import CampaignSerializer
from django.core.mail import send_mail
from decouple import config

FRONTEND_URL = config('FRONTEND_URL')



@api_view(['POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([AllowAny])
@csrf_exempt
def initialize_donation(request):
    """
    Initialize a donation transaction.
    """
    
    email = request.data.get('email')
    amount = request.data.get('amount')
    campaign_id = request.data.get('campaign_id')
    is_recurring = request.data.get('is_recurring', False)

    if not amount or not campaign_id:
        return Response({"error": "Amount and campaign_id are required."}, 
                       status=status.HTTP_400_BAD_REQUEST)
    
    if is_recurring and not email:
        return Response({"error": "Email is required for recurring donations."}, 
                      status=status.HTTP_400_BAD_REQUEST)
    
    try:
        campaign = Campaign.objects.get(id=uuid.UUID(campaign_id))
    except Campaign.DoesNotExist:
        return Response({"error": "Campaign not found"}, 
                       status=status.HTTP_404_NOT_FOUND)

    reference = str(uuid.uuid4())
    callback_url = f"{FRONTEND_URL}/donations/verify/{reference}"
    print(f"FRONTEND_URL is set to: {FRONTEND_URL}")

    metadata = {
        "campaign_id": campaign_id,
        "is_recurring": is_recurring,
        "reference": reference
    }

    paystack_email = email if email else f"anonymous_{reference[:8]}@"

    response = PaystackService.initialize_transaction(
        email=paystack_email,
        amount=amount,
        reference=reference,
        callback_url=callback_url,
        metadata=metadata
    )

    if response.get('status'):
        return Response(response, status=status.HTTP_200_OK)
    return Response({"error": response.get('message', 'Failed to initialize transaction.')}, 
                   status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def verify_donation(request, reference):
    """
    Verify donation and record it (only first payment counts toward campaign)
    """
    response = PaystackService.verify_transaction(reference)
    
    if not response.get('status'):
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    data = response.get('data', {})
    metadata = data.get('metadata', {})
    campaign_id = metadata.get('campaign_id')
    is_recurring = str(metadata.get('is_recurring', False)).lower() == 'true'
    amount = Decimal(data.get('amount', 0)) / 100  # Convert from kobo

    try:
        campaign = Campaign.objects.get(id=uuid.UUID(campaign_id))
    except Campaign.DoesNotExist:
        return Response({"error": "Campaign not found"}, 
                       status=status.HTTP_400_BAD_REQUEST)

    # Create the donation record (counts toward campaign total)
    donation = Donation.objects.create(
        campaign=campaign,
        amount=amount,
        paystack_reference=reference,
        is_recurring=is_recurring
    )

    campaign.save()

    # If recurring, create authorization record (future payments won't be counted)
    if is_recurring and data.get('authorization'):
        customer_email = data.get('customer', {}).get('email')
        if not customer_email:
            return Response({"error": "Customer email is required for recurring donations."}, 
                           status=status.HTTP_400_BAD_REQUEST)
        
        RecurringDonation.objects.create(
            email=customer_email,
            amount=amount,
            paystack_authorization_code=data.get('authorization').get('authorization_code'),
            paystack_subscription_code=data.get('subscription_code'),
            paystack_customer_code=data.get('customer').get('customer_code')
        )

    return Response({
        "status": "success",
        "message": "Payment verified",
        "data": {
            "amount": float(amount),
            "is_recurring": is_recurring,
            "campaign_id": campaign_id,
            "new_total": float(campaign.total_raised)  # Updated total
        }
    }, status=status.HTTP_200_OK)

@csrf_exempt
def paystack_webhook(request):
    if request.method == 'POST':
        payload = json.loads(request.body)
        print("=== Raw webhook payload ===")
        print(json.dumps(payload, indent=2)) 

        event = payload.get('event')
        data = payload.get('data', {})

        if event == 'charge.success':
            email = data.get('customer', {}).get('email')
            authorization = data.get('authorization', {})
            authorization_code = authorization.get('authorization_code')
            customer_code = data.get('customer', {}).get('customer_code')
            # campaign_id = data.get('metadata', {}).get('campaign_id')
            amount = int(data.get('amount', 0)) / 100  # Convert from kobo to Naira/USD
            
            raw_metadata = data.get('metadata')
            metadata = {}

            if isinstance(raw_metadata, dict):
                metadata = raw_metadata
            elif isinstance(raw_metadata, str) and raw_metadata.strip():
                try:
                    metadata = json.loads(raw_metadata)
                except json.JSONDecodeError:
                    metadata = {}
            is_recurring = metadata.get('is_recurring') == 'true'

            if not is_recurring:
                if RecurringDonation.objects.filter(
                    paystack_authorization_code=authorization_code,
                    email=email
                ).exists():
                    is_recurring = True

            print(f"[Webhook] charge.success for {email}")
            print(f"[Webhook] Is recurring: {is_recurring}")

            if is_recurring:
                donation = RecurringDonation.objects.filter(
                    paystack_authorization_code=authorization_code,
                    email=email
                ).order_by('-updated_at').first()

                if donation:
                    donation.updated_at = timezone.now()
                    donation.amount = amount
                    donation.paystack_customer_code = customer_code
                    donation.save()
                    print(f"[Webhook] Recurring donation updated for {email}")
                else:
                    RecurringDonation.objects.create(
                        email=email,
                        amount=amount,
                        paystack_authorization_code=authorization_code,
                        paystack_customer_code=customer_code,
                        is_active=True
                    )
                    print(f"[Webhook] New recurring donation created for {email}")

            else:
                print(f"[Webhook] One-time donation received from {email}")

        elif event == 'subscription.create':
            subscription_code = data.get('subscription_code')
            customer_code = data.get('customer', {}).get('customer_code')
            RecurringDonation.objects.filter(
                paystack_customer_code=customer_code
            ).update(
                paystack_subscription_code=subscription_code,
                is_active=True
            )
            print(f"[Webhook] Subscription code updated for customer {customer_code}")

        elif event == 'invoice.payment.failed':
            subscription_code = data.get('subscription_code')
            RecurringDonation.objects.filter(
                paystack_subscription_code=subscription_code
            ).update(is_active=False)
            print(f"[Webhook] Subscription {subscription_code} marked inactive due to payment failure")

        return JsonResponse({"status": "success"})

    return JsonResponse({"status": "error"}, status=400)

@api_view(['GET'])
def campaign_stats(request, campaign_id):
    """
    Get campaign statistics (only counts first payments)
    """
    try:
        campaign = Campaign.objects.get(campaign_id=campaign_id)
    except Campaign.DoesNotExist:
        return Response({"error": "Campaign not found"}, 
                       status=status.HTTP_404_NOT_FOUND)
    
    # Get count of active recurring donations for this campaign
    active_recurring = RecurringDonation.objects.filter(
        donation__campaign=campaign,
        is_active=True
    ).count()
    
    return Response({
        "campaign_id": campaign.campaign_id,
        "total_raised": float(campaign.total_raised),
        "progress_percentage": float(campaign.progress_percentage),
        "active_recurring_donations": active_recurring
    }, status=status.HTTP_200_OK)

# @csrf_exempt
class CampaignListAPIView(generics.ListAPIView):
    serializer_class = CampaignSerializer

    def get_queryset(self):
        return Campaign.objects.filter(is_active=True)
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

# @csrf_exempt
class CampaignDetailAPIView(generics.RetrieveAPIView):
    serializer_class = CampaignSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Campaign.objects.filter(is_active=True, is_hidden=False)
    
    def get_object(self):
        campaign_id = self.kwargs.get('id')
        return get_object_or_404(Campaign, id=campaign_id, is_active=True, is_hidden=False)
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, context={'request': request})
        return Response(serializer.data)
    
@csrf_exempt
@api_view(['POST'])
def contact_form(request):
    """
    Handle contact form submissions.
    """
    if request.method == "POST":
        try:
            data = request.data
            name = data.get('name')
            email = data.get('email')
            message = data.get('message')
            subject = data.get('subject')

            if not all([name, email, message, subject]):
                return Response(
                    {"success": False, "error": "All fields are required."},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            full_message = f"""
            New contact form submission:
            Name: {name}
            Email: {email}
            Subject: {subject}
            Message: {message}
            """
            
            send_mail(
                subject=f"Contact Form Submission: {subject}",
                message=full_message,
                from_email="sjepjenny@gmail.com",
                recipient_list=["sjepjenny@gmail.com"],
                fail_silently=False
            )

            return Response(
                {"success": True, "message": "Your message has been sent successfully."},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"success": False, "error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    return Response(
        {"success": False, "error": "Invalid request method"},
        status=status.HTTP_405_METHOD_NOT_ALLOWED
    )