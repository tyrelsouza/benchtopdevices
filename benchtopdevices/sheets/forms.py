from django import forms
from django.db import models
from django.utils.translation import gettext_lazy as _


class UploadFileForm(forms.Form):
    instrument = forms.CharField()
    customer_name = forms.CharField()
    customer_address = forms.CharField()
    control_number = forms.CharField()
    serial_number = forms.CharField()
    accuracy = forms.FloatField(initial=0.05, widget=forms.NumberInput(attrs={'step': 0.01}))
    barometric_pressure = forms.FloatField(widget=forms.NumberInput(attrs={'step': 0.01, 'max': 1100, 'min': 800}))
    temperature = forms.FloatField(widget=forms.NumberInput(attrs={'step': 0.01, 'max': 1000.0, 'min': -459.67}))
    humidity = forms.FloatField(widget=forms.NumberInput(attrs={'step': 0.01, 'max': 100.0, 'min': 0.0}))

    CHOICES = [
        ('TV', _('Transducer Verify')),
        ('HC', _('Hardware Calibration'))
    ]

    report_type = forms.ChoiceField(
        widget=forms.RadioSelect,
        choices=CHOICES, 
    )
    file = forms.FileField()