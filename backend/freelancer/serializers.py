from rest_framework import serializers
from .models import Freelancer, Skill

class FreelancerCreateSerializer(serializers.ModelSerializer):
    skill_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False,
        help_text="List of skill IDs to associate with the freelancer."
    )

    class Meta:
        model = Freelancer
        fields = [
            "experience_level",
            "cv",
            "portfolio",
            "is_tested",
            "is_verified",
            "skill_ids",
        ]

    def validate(self, attrs):
        if self.instance is None: 
            user = self.context["request"].user
            if hasattr(user, 'freelancer_profile'):
                raise serializers.ValidationError("This user is already a freelancer.")
        
        skill_ids = attrs.get("skill_ids")
        if skill_ids:
            existing_skills = set(Skill.objects.filter(id__in=skill_ids).values_list('id', flat=True))
            if len(existing_skills) != len(skill_ids):
                invalid_ids = set(skill_ids) - existing_skills
                raise serializers.ValidationError(f"Invalid skill IDs: {list(invalid_ids)}")
        return attrs

    def create(self, validated_data):
        skill_ids = validated_data.pop("skill_ids", [])
        
        validated_data["uid"] = self.context["request"].user
        
        freelancer = super().create(validated_data)
        
        if skill_ids:
            skills = Skill.objects.filter(id__in=skill_ids)
            freelancer.skills.add(*skills)
        
        return freelancer

    def update(self, instance, validated_data):
        skill_ids = validated_data.pop("skill_ids", None)
        
        instance = super().update(instance, validated_data)
        
        if skill_ids is not None:
            skills = Skill.objects.filter(id__in=skill_ids)
            instance.skills.set(skills) 
        
        return instance


class FreelancerOutSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source="uid.user_name", read_only=True)
    email = serializers.EmailField(source="uid.email", read_only=True)
    skills = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Freelancer
        fields = [
            "id",
            "user_name",
            "email",
            "experience_level",
            "cv",
            "portfolio",
            "is_tested",
            "is_verified",
            "is_deleted",
            "created_at",
            "updated_at",
            "skills", 
        ]

    def get_skills(self, obj):
        return [{"id": skill.id, "skill_name": skill.skill_name} for skill in obj.skills.all()]