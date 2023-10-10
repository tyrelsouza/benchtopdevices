from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.core.exceptions import ValidationError

from .forms import SheetForm, SheetForm
from .parsers import parse_transducer, parse_hardware_calibration


def upload_file(request):
    if request.method == "POST":
        f = SheetForm(request.POST, request.FILES)
        if f.is_valid():
            data = f.clean()
            as_found = request.FILES.get('as_found')
            as_left = request.FILES.get('as_left')
            both = request.FILES.get('both')
            if both:
                if data['report_type'] == "TV":
                    tv = parse_transducer(both.read().decode(), data['accuracy'])
                    f.transducer_type = tv["Transducer Type"]
                else:
                    hc = parse_hardware_calibration(both.read().decode(), data['accuracy'])
            elif as_found and as_left:
                # TODO: DO THIS
                pass
            else:
                raise ValidationError("Please provide proper files")
            f.save()
            breakpoint()
            return HttpResponseRedirect("/")
    else:
        form = SheetForm()
    return HttpResponse("hi")
