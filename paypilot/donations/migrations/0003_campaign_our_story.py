# Generated by Django 5.2.2 on 2025-06-17 23:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('donations', '0002_alter_campaign_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='campaign',
            name='our_story',
            field=models.TextField(blank=True, help_text='Story about the campaign or team', null=True),
        ),
    ]
