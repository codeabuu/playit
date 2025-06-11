from django.shortcuts import render
from rest_framework import status
import uuid
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services import PaystackService
from .models import RecurringDonation
from django.conf import settings
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import AllowAny
from django.views.decorators.csrf import csrf_exempt
from datetime import timedelta
from django.utils import timezone



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

    if not email or not amount or not campaign_id:
        return Response({"error": "Email, amount, and campaign_id are required."}, status=status.HTTP_400_BAD_REQUEST)
    
    reference = str(uuid.uuid4())
    callback_url = f"{settings.FRONTEND_URL}/donations/verify/{reference}/"

    metadata = {
        "campaign_id": campaign_id,
        "is_recurring": is_recurring,
        "reference": reference
    }

    if is_recurring:
        response = PaystackService.initialize_transaction(
            email=email,
            amount=amount,
            reference=reference,
            callback_url=callback_url,
            metadata=metadata
        )
    else:
        response = PaystackService.initialize_transaction(
            email=email,
            amount=amount,
            reference=reference,
            callback_url=callback_url,
            metadata=metadata
        )

    if response.get('status'):
        return Response(response, status=status.HTTP_200_OK)
    else:
        return Response({"error": response.get('message', 'Failed to initialize transaction.')}, status=status.HTTP_400_BAD_REQUEST)
    
# donations/views.py
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

@api_view(['GET'])
def verify_donation(request, reference):
    response = PaystackService.verify_transaction(reference)
    
    if response.get('status'):
        data = response.get('data', {})
        metadata = data.get('metadata', {})
        is_recurring = metadata.get('is_recurring', False)
        
        if is_recurring and data.get('authorization'):
            # Create recurring donation record
            RecurringDonation.objects.create(
                email=data.get('customer', {}).get('email'),
                amount=data.get('amount') / 100,  # Convert from kobo
                # campaign_id=metadata.get('campaign_id'),
                paystack_authorization_code=data.get('authorization').get('authorization_code'),
                paystack_subscription_code=data.get('subscription_code'),
                paystack_customer_code=data.get('customer').get('customer_code')
            )
        
        return Response({
            "status": "success",
            "message": "Payment verified",
            "data": {
                "amount": data.get('amount') / 100,
                "is_recurring": is_recurring,
                "campaign_id": metadata.get('campaign_id')
            }
        }, status=status.HTTP_200_OK)
    else:
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

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



# donations/views.py
from django.db.models import Sum
from decimal import Decimal

@api_view(['GET'])
def campaign_stats(request, campaign_id):
    # Calculate total from one-time donations (you might need to track this in another way)
    # For this example, we'll assume you have a way to track one-time donations
    
    # Calculate recurring donations
    recurring_total = RecurringDonation.objects.filter(
        campaign_id=campaign_id,
        is_active=True
    ).aggregate(total=Sum('amount'))['total'] or Decimal('0.00')
    
    # In a real implementation, you'd combine this with one-time donations
    total_raised = recurring_total  # Add one-time donations here
    
    return Response({
        "campaign_id": campaign_id,
        "total_raised": float(total_raised),
        "active_recurring_donations": RecurringDonation.objects.filter(
            campaign_id=campaign_id,
            is_active=True
        ).count()
    }, status=status.HTTP_200_OK)

