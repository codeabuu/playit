from django.db import models

class RecurringDonation(models.Model):
    """
    Model to represent a recurring donation.
    """
    email = models.EmailField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    campaign_id = models.CharField(max_length=100)
    paystack_authorization_code = models.CharField(max_length=100)
    paystack_subscription_code = models.CharField(max_length=100)
    paystack_customer_code = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.email} - {self.amount} ({"active" if self.is_active else "inactive"})"
