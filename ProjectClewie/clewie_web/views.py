from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseServerError
import json


def index(request):
    return render(request, "views/home.html")

@csrf_exempt
def create(request):
    if request.method == "GET":
        return render(request, "views/create.html")
    if request.method == "POST":
        req = json.loads(request.body)
        try:
            return HttpResponse(json.dumps(req))

        except KeyError:
            HttpResponseServerError("Malformed data!")
        HttpResponse("Got json data")


