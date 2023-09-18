from django.db import models
from django.utils.translation import gettext_lazy as _


class Sheet(models.Model):
    instrument_model = models.CharField(max_length=256)
    serial_number = models.CharField(max_length=256)
    channel = models.CharField(max_length=256)
    transducer_model = models.CharField(max_length=256)
    transducer_span = models.CharField(max_length=256)

    customer_name = models.CharField(max_length=256)
    onsite_cal = models.BooleanField(default=False)
    control_doc = models.CharField(max_length=256)
    technician = models.CharField(max_length=256)

    accuracy = models.FloatField()

    barometric_pressure = models.FloatField()
    temperature = models.FloatField()
    humidity = models.FloatField()

    calibration_serial = models.CharField(max_length=100)
    calibration_model = models.CharField(max_length=100)
    calibration_date = models.DateField()
    calibration_due_date = models.DateField()
    calibration_cert_id = models.CharField(max_length=100)

    CHOICES = [
        ('TV', _('Transducer Verify')),
        ('HC', _('Hardware Calibration'))
    ]

    report_type = models.CharField(
        max_length=256,
        choices=CHOICES, 
    )

    as_found = models.FileField(blank=True)
    as_left = models.FileField(blank=True)
    both = models.FileField(blank=True)