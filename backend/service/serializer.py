from rest_framework import serializers
from .models import Service


class ServiceCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        exclude = ["freelancerId"]
        read_only_fields = ["freelancerId"]  # <- this is the key fix


class ServiceRetriveDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        exclude = ["is_deleted"]
