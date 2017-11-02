from django.conf.urls import url
from . import views
from clewie_web.models import EstimatorWeb

estimators = "|".join([est["name"].lower() for est in EstimatorWeb.objects.values()])

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^create/$', views.create, name='create'),
    url(r'^create/' + estimators + '$', views.createEstimator, name="createEstimator"),
    url(r'^manage/' + estimators + '$', views.manageEstimator, name="manageEstimator"),

    url(r'^fileupload/$', views.fileUpload, name='fileUpload')
]
