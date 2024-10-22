# Generated by Django 5.0.3 on 2024-04-22 18:56

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_alter_profile_gender'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='phonenumber',
            new_name='phone_number',
        ),
        migrations.AlterField(
            model_name='profile',
            name='registered_email',
            field=models.OneToOneField(blank=True, on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='profile', serialize=False, to=settings.AUTH_USER_MODEL),
        ),
    ]
