from django.http import HttpResponse, HttpResponseServerError
import json
from clewie_web.filehelper import FileHelper
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def fileUpload(request):
    if request.method == 'POST':
        options = dict()
        options["delimiter"] = request.POST.get("delimiter", ",")
        options["float_precision"] = request.POST.get("float_precision", None)
        options["usecols"] = request.POST.get("usecols", None)
        options["roles"] = [ v for v in request.POST.get("roles", None).split(",")]
        options["types"] = request.POST.get("types", None)
        f = request.FILES['file']
        fh = FileHelper(f)
        fh.updateOptions(options)
        htmlTable = fh.readPartial().to_html(index=False, classes="clr")
        return HttpResponse(htmlTable)
    else:
        return HttpResponseServerError()


