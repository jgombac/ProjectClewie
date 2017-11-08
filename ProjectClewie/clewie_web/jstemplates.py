from django.http import HttpResponse, JsonResponse, HttpResponseServerError
from django.template.loader import render_to_string


def get_modals():

    return str({"asd":template("fileEditor.html")})


def template(name):
    return render_to_string("modals/" + name)



