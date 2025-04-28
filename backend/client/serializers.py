from rest_framework import serializers
from .models import Client

class ClientCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = [
            "phone",
            "company",
        ]  

    def validate(self, attrs):
        if self.instance is None: 
            user = self.context["request"].user
            if hasattr(user, 'client_profile'):
                raise serializers.ValidationError("This user is already a client.")
        return attrs

    def create(self, validated_data):
        # Automatically set the uid to the currently logged-in user
        validated_data["uid"] = self.context["request"].user
        return super().create(validated_data)

class ClientOutSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source="uid.user_name", read_only=True)
    email = serializers.EmailField(source="uid.email", read_only=True)

    class Meta:
        model = Client
        fields = [
            "id",
            "user_name",
            "email",
            "phone",
            "company",
            "is_deleted",
            "created_at",
            "updated_at",
        ]