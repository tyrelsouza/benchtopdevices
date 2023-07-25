from django.db import models

# Create your models here.

class Configuration(models.Model):
    sertial = models.CharField(max_length = 200)
    description = models.TextField()
    calibration_date = models.DateField()
    calibration_due_date = models.DateField()

    def __str__(self):
        return f"{self.serial} {self.description}"