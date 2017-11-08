from django import template
from django.http import HttpResponse, JsonResponse, HttpResponseServerError
from django.template.loader import render_to_string
import json

register = template.Library()

@register.filter(name="to_json")
def to_json(val):
    return json.dumps(val)

def get_modals(request):
    templates = {
        "modals": json.dumps({
            "fileManager":template("fileManager.html"),
        })
    }
    return templates


def template(name):
    return render_to_string("modals/" + name).encode("unicode_escape").decode().replace("\"", '\\"')



