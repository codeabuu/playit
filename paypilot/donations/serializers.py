from rest_framework import serializers
from .models import Campaign, Donation, RecurringDonation

class CampaignSerializer(serializers.ModelSerializer):
    campaign_id = serializers.CharField(source='id', read_only=True)
    total_raised = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    progress_percentage = serializers.SerializerMethodField()
    amount_still_needed = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Campaign
        fields = [
            'campaign_id', 'title', 'description', 'full_description', 'image',
            'goal_amount', 'total_raised', 'progress_percentage',
            'amount_still_needed', 'team_needs'
        ]
    
    def get_progress_percentage(self, obj):
        return round(obj.progress_percentage, 1)

    def get_amount_still_needed(self, obj):
        return round(obj.goal_amount - obj.total_raised, 2)
    
    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            # Auto builds full URL using request object if available
            if request:
                return request.build_absolute_uri(obj.image.url)
            else:
                return f"https://mymedia-x0xy.onrender.com{obj.image.url}"
        return None
    
class DonationInitSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False)
    amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    campaign_id = serializers.UUIDField()
    is_recurring = serializers.BooleanField(default=False)

    def validate(self, data):
        if data['is_recurring'] and not data.get('email'):
            raise serializers.ValidationError("Email is required for recurring donations.")
        return data
