from django import forms
from django.forms.widgets import ClearableFileInput
from django.db import models
from django.utils.translation import gettext_lazy as _

from .models import Sheet


class SheetForm(forms.ModelForm):
    class Meta:
        model = Sheet
        fields = [
            "customer_name",
            "onsite_cal",
            "control_doc",
            "technician",

            "instrument_model",
            "serial_number",
            "channel",
            "transducer_model",
            "transducer_span",

            "calibration_serial",
            "calibration_model",
            "calibration_date",
            "calibration_due_date",
            "calibration_cert_id",

            "accuracy",
            "barometric_pressure",
            "temperature",
            "humidity",
            "report_type",
            "as_found",
            "as_left",
            "both",
        ]

        widgets = {
            "accuracy": forms.NumberInput(attrs={'step': 0.01}),
            "barometric_pressure": forms.NumberInput(attrs={'step': 0.01, 'max': 1100, 'min': 800}),
            "temperature": forms.NumberInput(attrs={'step': 0.01, 'max': 1000.0, 'min': -459.67}),
            "humidity": forms.NumberInput(attrs={'step': 0.01, 'max': 100.0, 'min': 0.0}),
            "calibration_date": forms.SelectDateWidget(),
            "calibration_due_date": forms.SelectDateWidget(),

        }

    def __init__(self, *args, **kwargs):
        super(SheetForm, self).__init__(*args, **kwargs)

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
