from django.http import HttpResponse, JsonResponse, HttpResponseServerError
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
        options["types"] = [v for v in request.POST.get("types", None).split(",")]

        f = request.FILES['file']
        fh = FileHelper(f)
        fh.updateOptions(options)

        action = request.POST.get("action", "upload")

        data = None

        if action == "upload":
            data = fh.onUpload()
        elif action == "process":
            data = fh.onProcess()


        types = fh.dataParams(data)
        table = data.to_html(index=False, max_rows=1, classes="clr")
        
        return JsonResponse({"table": table, "types": types, "roles": "roles", "action": action })

        # print(options["roles"], options["types"])
        # # if data parameters are set we can try to read the whole file
        # if len(options["roles"]) > 1 and len(options["types"]) > 1:
        #     data = fh.readAll()
        #     print(data)
        #     print(data.dtypes)
        # else:
        #     data = fh.readPartial()
        # # data = fh.readPartial()
        # types = fh.dataParams(data)
        # table = data.to_html(index=False, classes="clr")
        # return JsonResponse({"table": table, "types": types, "roles": "roles" })
    else:
        return HttpResponseServerError()


