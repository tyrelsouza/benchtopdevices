from django.http import HttpResponseRedirect
from django.shortcuts import render
from .forms import UploadFileForm
from .parsers import parse_transducer, parse_hardware_calibration



def upload_file(request):
    if request.method == "POST":
        breakpoint()
        f = UploadFileForm(request.POST, request.FILES)
        if f.is_valid():
            data = f.clean()
            content = request.FILES['file'].read()
            return HttpResponseRedirect("/success/url/")
    else:
        form = UploadFileForm()
    return render(request, "sheets/upload.html", {"form": form})