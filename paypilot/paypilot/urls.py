from django.contrib import admin
from django.urls import path
from donations.views import(
    verify_donation,
    paystack_webhook,
    initialize_donation,
    campaign_stats
)

urlpatterns = [
    path('initialize', initialize_donation, name='initialize_donation'),
    path('verify/<str:reference>/', verify_donation, name='verify_donation'),
    path('paystack/webhook/', paystack_webhook, name='paystack_webhook'),
    path('campaign/<int:campaign_id>/stats/', campaign_stats, name='campaign_stats'),
]
