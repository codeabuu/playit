from django.contrib import admin
from .models import Campaign, Donation, RecurringDonation
from django import forms
import json

class CampaignAdminForm(forms.ModelForm):
    team_needs_input = forms.CharField(
        widget=forms.Textarea(attrs={'rows': 4}),
        required=False,
        help_text="Enter each need on a new line",
        label="Team Needs"
    )
    
    class Meta:
        model = Campaign
        fields = '__all__'
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.team_needs:
            self.initial['team_needs_input'] = "\n".join(self.instance.team_needs)
    
    def clean_team_needs_input(self):
        data = self.cleaned_data['team_needs_input']
        return [line.strip() for line in data.split('\n') if line.strip()]
    
    def save(self, commit=True):
        instance = super().save(commit=False)
        instance.team_needs = self.cleaned_data['team_needs_input']
        if commit:
            instance.save()
        return instance

@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    form = CampaignAdminForm
    list_display = ('title', 'goal_amount', 'progress_percentage_display', 'amount_still_needed_display', 'team_needs_preview')
    readonly_fields = ('id', 'progress_percentage_display', 'total_raised_display', 'amount_still_needed_display')
    fieldsets = (
        ('Basic Information', {
            'fields': ('id', 'title', 'description', 'full_description', 'our_story', 'image')
        }),
        ('Financial Information', {
            'fields': (
                'goal_amount',
                'manual_total_raised',
                ('total_raised_display', 'progress_percentage_display'),
                'amount_still_needed_display',
            )
        }),
        ('Team Needs', {
            'fields': ('team_needs_input',),
            'description': 'Enter each need on a separate line'
        }),
    )
    
    def amount_still_needed_display(self, obj):
        if obj.goal_amount is None or obj.total_raised is None:
            return "N/A"
        remaining = obj.goal_amount - obj.total_raised
        if remaining < 0:
            remaining = 0
        return f"${remaining:,.2f}"
    amount_still_needed_display.short_description = 'Still Needed'

    
    def progress_percentage_display(self, obj):
        return f"{obj.progress_percentage:.1f}%"
    progress_percentage_display.short_description = 'Progress'
    
    def total_raised_display(self, obj):
        return f"${obj.total_raised:,.2f}"
    total_raised_display.short_description = 'Raised Amount'
    
    def team_needs_preview(self, obj):
        return ", ".join(obj.team_needs[:3]) + ("..." if len(obj.team_needs) > 3 else "")
    team_needs_preview.short_description = 'Team Needs'

@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ('campaign', 'amount', 'created_at')
    list_filter = ('campaign', 'created_at')
    search_fields = ('paystack_reference', 'campaign__title')
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'

@admin.register(RecurringDonation)
class RecurringDonationAdmin(admin.ModelAdmin):
    list_display = ('email', 'amount', 'is_active', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('email', 'paystack_authorization_code')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('email', 'amount', 'is_active')
        }),
        ('Paystack Information', {
            'fields': ('paystack_authorization_code', 'paystack_subscription_code', 'paystack_customer_code'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )