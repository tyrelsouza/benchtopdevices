# Generated by Django 4.2.5 on 2023-09-18 17:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sheets', '0002_alter_sheet_calibration_cert_id_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sheet',
            name='customer_address',
        ),
        migrations.AddField(
            model_name='sheet',
            name='control_doc',
            field=models.CharField(default=0, max_length=256),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='sheet',
            name='onsite_cal',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='sheet',
            name='technician',
            field=models.CharField(default=0, max_length=256),
            preserve_default=False,
        ),
    ]
