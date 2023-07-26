from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.

class Configuration(models.Model):
    serial = models.CharField(max_length=100)
    device = models.CharField(max_length=100)
    calibration_date = models.DateField()
    calibration_due_date = models.DateField()

    def __str__(self):
        return f"{self.serial} {self.device} [{self.calibration_date} to {self.calibration_due_date}]"


class Sheet(models.Model):
    instrument = models.CharField(max_length=256)
    customer_name = models.CharField(max_length=256)
    customer_address = models.CharField(max_length=256)
    control_number = models.CharField(max_length=256)
    serial_number = models.CharField(max_length=256)
    accuracy = models.FloatField()
    barometric_pressure = models.FloatField()
    temperature = models.FloatField()
    humidity = models.FloatField()


    CHOICES = [
        ('TV', _('Transducer Verify')),
        ('HC', _('Hardware Calibration'))
    ]

    report_type = models.CharField(max_length=256,
        choices=CHOICES, 
    )

    as_found = models.FileField(blank=True)
    as_left = models.FileField(blank=True)
    both = models.FileField(blank=True)

    configuration = models.ManyToManyField("Configuration")