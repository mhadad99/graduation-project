from rest_framework import serializers
from .models import Freelancer, Skill, Certification, Education


class FreelancerCreateSerializer(serializers.ModelSerializer):
    """
    Serializer for creating/updating freelancer profiles.
    Accepts skill IDs, certifications, and educations in payload.
    """

    skills = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False,
        help_text="List of skill IDs to associate with the freelancer.",
    )
    certifications = serializers.ListField(
        child=serializers.DictField(child=serializers.CharField()),
        write_only=True,
        required=False,
        help_text="List of certification dicts with name, issuer, year",
    )
    educations = serializers.ListField(
        child=serializers.DictField(child=serializers.CharField()),
        write_only=True,
        required=False,
        help_text="List of education dicts with degree, school, year",
    )
    # Add fields for languages and qualities as lists
    languages_list = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=False,
        help_text="List of languages the freelancer speaks",
    )
    qualities_list = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=False,
        help_text="List of personal qualities or expertise",
    )

    class Meta:
        model = Freelancer
        fields = [
            "experience_level",
            "cv",
            "portfolio",
            "is_tested",
            "is_verified",
            "skills",
            "certifications",
            "educations",
            "languages_list",
            "qualities_list"
        ]

    def validate(self, attrs):
        request = self.context.get("request")

        # Prevent duplicate freelancer profile
        if self.instance is None and request:
            user = request.user
            if hasattr(user, "freelancer_profile"):
                raise serializers.ValidationError("This user is already a freelancer.")

        # Validate skill IDs if provided
        skill_ids = attrs.get("skills")
        if skill_ids:
            existing_skills = set(
                Skill.objects.filter(id__in=skill_ids).values_list("id", flat=True)
            )
            invalid_ids = set(skill_ids) - existing_skills
            if invalid_ids:
                raise serializers.ValidationError(f"Invalid skill IDs: {list(invalid_ids)}")

        return attrs

    def create(self, validated_data):
        """
        Create freelancer profile along with related skills, certs, and educations.
        """
        skill_ids = validated_data.pop("skills", [])
        certifications_data = validated_data.pop("certifications", [])
        educations_data = validated_data.pop("educations", [])
        
        # Convert languages and qualities lists to comma-separated strings
        languages_list = validated_data.pop("languages_list", None)
        if languages_list is not None:
            validated_data["languages"] = ", ".join(languages_list)
            
        qualities_list = validated_data.pop("qualities_list", None)
        if qualities_list is not None:
            validated_data["qualities"] = ", ".join(qualities_list)

        # Set the user from context
        validated_data["uid"] = self.context["request"].user
        freelancer = super().create(validated_data)

        # Link skills
        if skill_ids:
            skills = Skill.objects.filter(id__in=skill_ids)
            freelancer.skills.add(*skills)

        # Add certifications
        for cert in certifications_data:
            if cert.get("name"):
                obj, created = Certification.objects.get_or_create(**cert)
                freelancer.certifications.add(obj)

        # Add educations
        for edu in educations_data:
            if edu.get("degree") and edu.get("school"):
                obj, created = Education.objects.get_or_create(**edu)
                freelancer.educations.add(obj)

        return freelancer

    def update(self, instance, validated_data):
        """
        Update freelancer profile and related many-to-many data.
        """
        skill_ids = validated_data.pop("skills", None)
        certifications_data = validated_data.pop("certifications", []) or []
        educations_data = validated_data.pop("educations", []) or []
        
        # Convert languages and qualities lists to comma-separated strings
        languages_list = validated_data.pop("languages_list", None)
        if languages_list is not None:
            validated_data["languages"] = ", ".join(languages_list)
            
        qualities_list = validated_data.pop("qualities_list", None)
        if qualities_list is not None:
            validated_data["qualities"] = ", ".join(qualities_list)

        # Update basic fields
        instance = super().update(instance, validated_data)

        # Update skills
        if skill_ids is not None:
            skills = Skill.objects.filter(id__in=skill_ids)
            instance.skills.set(skills)

        # Update certifications
        if certifications_data:
            instance.certifications.clear()
            for cert in certifications_data:
                if cert.get("name"):
                    obj, created = Certification.objects.get_or_create(**cert)
                    instance.certifications.add(obj)

        # Update educations
        if educations_data:
            instance.educations.clear()
            for edu in educations_data:
                if edu.get("degree") and edu.get("school"):
                    obj, created = Education.objects.get_or_create(**edu)
                    instance.educations.add(obj)

        return instance

class FreelancerOutSerializer(serializers.ModelSerializer):
    """
    Output serializer for freelancer data. Includes nested user info and skills list.
    """
    user_name = serializers.CharField(source="uid.user_name", read_only=True)
    email = serializers.EmailField(source="uid.email", read_only=True)
    skills = serializers.SerializerMethodField(read_only=True)
    certifications = serializers.SerializerMethodField(read_only=True)
    educations = serializers.SerializerMethodField(read_only=True)
    languages_list = serializers.SerializerMethodField()
    qualities_list = serializers.SerializerMethodField()
    
    class Meta:
        model = Freelancer
        fields = [
            "id",
            "uid",
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
            "certifications",
            "educations",
            "languages_list",
            "qualities_list"
        ]

    def get_skills(self, obj):
        return [
            {"id": skill.id, "skill_name": skill.skill_name}
            for skill in obj.skills.all()
        ]
        
    def get_certifications(self, obj):
        return [
            {
                "id": cert.id,
                "name": cert.name,
                "issuer": cert.issuer,
                "year": cert.year
            }
            for cert in obj.certifications.all()
        ]

    def get_educations(self, obj):
        return [
            {
                "id": edu.id,
                "degree": edu.degree,
                "school": edu.school,
                "year": edu.year
            }
            for edu in obj.educations.all()
        ]
        
    def get_languages_list(self, obj):
        if obj.languages:
            return [lang.strip() for lang in obj.languages.split(",")]
        return []


    def get_qualities_list(self, obj):
        if obj.qualities:
            return [q.strip() for q in obj.qualities.split(",")]
        return []