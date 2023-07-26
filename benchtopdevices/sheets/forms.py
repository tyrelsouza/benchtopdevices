from django import forms
from django.forms.widgets import ClearableFileInput
from django.db import models
from django.utils.translation import gettext_lazy as _


class UploadFileForm(forms.Form):
    instrument = forms.CharField()
    customer_name = forms.CharField()
    customer_address = forms.CharField()
    control_number = forms.CharField()
    serial_number = forms.CharField()
    accuracy = forms.FloatField(widget=forms.NumberInput(attrs={'step': 0.01}))
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

    as_found = forms.FileField(required=False, widget=ClearableFileInput(attrs={'placeholder': ...}))
    as_left = forms.FileField(required=False, widget=ClearableFileInput(attrs={'placeholder': ...}))
    both = forms.FileField(required=False, widget=ClearableFileInput(attrs={'placeholder': ...}))

    def __init__(self, *args, **kwargs):
        super(UploadFileForm, self).__init__(*args, **kwargs)
       
        for name, field in self.fields.items():
            # add v-model to each model field
            if isinstance(field, forms.fields.FileField):
                field.widget.attrs.update(
                    {
                    'v-on:change': f"change_{name}",
                    'v-if': f"show_{name}"
                    })
            else:
                field.widget.attrs.update({'v-model': name})