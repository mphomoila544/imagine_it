from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Illustrations(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name_of_illustration = models.CharField(max_length=200)
    illustration_description = models.CharField(max_length=500)
    #store drawing