from rest_framework import serializers
from .models import Service


class ServiceCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        exclude = ["freelancerId"]


class ServiceRetriveDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        exclude = ["is_deleted"]
