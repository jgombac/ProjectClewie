from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseServerError
from django.template import RequestContext
import json
from django.views.generic import ListView
from clewie_web.models import EstimatorWeb as ests
from .forms import FileUploadForm
from clewie_web.filehelper import FileHelper
from . import jstemplates


# c = {"modals": jstemplates.get_modals}

def index(request):
    return render(request, "views/home.html")


@csrf_exempt
def create(request):
    if request.method == "GET":
        est = {"estimators":ests.objects.values()}
        return render(request, "views/create.html", est)
    if request.method == "POST":
        req = json.loads(request.body)
        try:
            return HttpResponse(json.dumps(req))

        except KeyError:
            HttpResponseServerError("Malformed data!")
        HttpResponse("Got json data")


@csrf_exempt
def createEstimator(request):
    est = request.get_full_path().strip("/").split("/")[-1]
    if request.method == "GET":
        form = FileUploadForm()
        return render(request, "views/"+ est +".html", {"form": form})
    elif request.method == "POST":
        return HttpResponse(request.body)


@csrf_exempt
def manageEstimator(request):
    est = request.get_full_path().strip("/").split("/")[-1]
    return render(request, "views/"+ est +".html")


