from django.contrib import admin
from django.urls import path
from donations.views import(
    verify_donation,
    paystack_webhook,
    initialize_donation,
    campaign_stats,
    contact_form,
)
from donations.views import CampaignListAPIView, CampaignDetailAPIView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('initialize', initialize_donation, name='initialize_donation'),
    path('donations/verify/<uuid:reference>/', verify_donation, name='verify_donation'),
    path('paystack/webhook/', paystack_webhook, name='paystack_webhook'),
    path('campaign/<int:campaign_id>/stats/', campaign_stats, name='campaign_stats'),
    path('api/campaigns/', CampaignListAPIView.as_view(), name='campaign_list'),
    path('api/campaigns/<uuid:id>/', CampaignDetailAPIView.as_view(), name='campaign_detail'),
    path('api/contact/', contact_form, name='contact_form'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)