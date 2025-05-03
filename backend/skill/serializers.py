from rest_framework import serializers
from .models import Skill

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["id", "skill_name"]

    def validate_skill_name(self, value):
        if Skill.objects.filter(skill_name__iexact=value).exists():
            raise serializers.ValidationError("This skill already exists.")
        return value