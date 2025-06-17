from django.db import models
from django.core.validators import MinValueValidator
from decimal import Decimal
import uuid
import json
from django.db.models import Sum
from django.utils import timezone
from datetime import timedelta
from cloudinary.models import CloudinaryField

class RecurringDonation(models.Model):
    """
    Model to represent a recurring donation.
    """
    email = models.EmailField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    # campaign_id = models.CharField(max_length=100)
    paystack_authorization_code = models.CharField(max_length=100)
    paystack_subscription_code = models.CharField(max_length=100, blank=True, null=True)
    paystack_customer_code = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.email} - {self.amount} ({"active" if self.is_active else "inactive"})"
    
class Campaign(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    description = models.TextField()
    full_description = models.TextField(blank=True, null=True)
    image = CloudinaryField('image', blank=True, null=True) 
    goal_amount = models.DecimalField(
        max_digits=10, 
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.01'))]
    )
    our_story = models.TextField(blank=True, null=True, help_text="Story about the campaign or team")
    team_needs = models.JSONField(default=list)
    manual_total_raised = models.DecimalField(
    max_digits=10,
    decimal_places=2,
    default=Decimal('0.00'),
    validators=[MinValueValidator(Decimal('0.00'))],
    help_text="Initial raised amount before donations were tracked"
)
    completed_at = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_hidden = models.BooleanField(default=False, help_text="Hide campaign from public view")

    def __str__(self):
        return f"{self.title} (Goal: ${self.goal_amount})"
    
    @property
    def campaign_id(self):
        """Return the unique identifier for the campaign"""
        return str(self.id)

    @property
    def total_raised(self):
        """Calculate total donations for this campaign"""
        donations_total = self.donation_set.aggregate(total=Sum('amount'))['total'] or Decimal('0.00')
        return self.manual_total_raised + donations_total

    @property
    def progress_percentage(self):
        """Calculate funding progress percentage"""
        if not self.goal_amount:
            return 0
        return min(100, (self.total_raised / self.goal_amount) * 100)
    
    def save(self, *args, **kwargs):
        # Call the original save first
        super().save(*args, **kwargs)
    
        if self.progress_percentage >= 100 and not self.completed_at:
            self.completed_at = timezone.now()
            self.save(update_fields=['completed_at'])
    

class Donation(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        validators=[MinValueValidator(Decimal('0.01'))]
    )
    paystack_reference = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_recurring = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"${self.amount} to {self.campaign.title}"