from django.db import models

# Create your models here.

class Configuration(models.Model):
    serial = models.CharField(max_length=100)
    device = models.CharField(max_length=100)
    calibration_date = models.DateField()
    calibration_due_date = models.DateField()

    def __str__(self):
        return f"{self.serial} {self.description}"