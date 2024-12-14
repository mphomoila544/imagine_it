from .models import Illustrations
from django.contrib.auth.models import user
from rest_framework import serializers

class Illustration_serializer(serializers.Modelserializer):
    class Meta:
        model = Illustrations
        fields = ["user", "name_of_illustration", "illustration_description"]

