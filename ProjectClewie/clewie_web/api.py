from django.http import HttpResponse, JsonResponse, HttpResponseServerError
import json
from clewie_web.filehelper import FileHelper
from .models import EstimatorSave
from django.views.decorators.csrf import csrf_exempt
from .tf_api import estimator as est
import pickle


@csrf_exempt
def manageEstimator(request):
    if request.method == "POST":
        classificator = est.Classificator()
        classificator.initialize()
        classificator.train()
        # params = json.loads(request.body)
        # action = params["action"]
        # est_id = params["est_id"]


        #params validations

        # if action == "init":
        #     estimator = est.Estimator(est_id)
        #     serialized = pickle.dumps(estimator, -1)
        #     EstimatorSave(1, est_id, serialized).save()
        # elif action == "train":
        #     pass
        # elif action == "predict":
        #     pass
        # elif action == "properties":
        #     pass
        return JsonResponse({"est_id": "success"})
    else:
        return HttpResponseServerError("Request requires POST parameters")



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


        types, roles = fh.dataParams(data)
        table = data.to_html(index=False, max_rows=1, classes=["clr", "rtable", "rtable--flip"])
        
        return JsonResponse({"table": table, "types": types, "roles": roles, "action": action })

    else:
        return HttpResponseServerError()


