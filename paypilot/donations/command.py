from django.core.management.base import BaseCommand
from .models import Campaign
from django.utils import timezone
from datetime import timedelta

class Command(BaseCommand):
    help = "Archives campaigns that were completed more than 48 hours ago"

    def handle(self, *args, **kwargs):
        cutoff = timezone.now() - timedelta(hours=48)
        campaigns_to_archive = Campaign.objects.filter(
            completed_at__lte=cutoff,
            is_active=True
        )

        count = campaigns_to_archive.update(is_active=False)
        self.stdout.write(self.style.SUCCESS(f"{count} campaign(s) archived."))
