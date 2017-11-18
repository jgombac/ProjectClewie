from django.db import models


class EstimatorWeb(models.Model):
    name = models.CharField(max_length=40)
    url = models.CharField(max_length=255)
    image = models.CharField(max_length=255)
    more_link = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class EstimatorSave(models.Model):
    est_id = models.CharField(max_length=36)
    serialized = models.TextField()

    def __str__(self):
        return self.est_id
