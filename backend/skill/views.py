from django.http import Http404
from rest_framework.views import APIView
from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    UpdateAPIView,
    DestroyAPIView,
)
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Skill
from .serializers import SkillSerializer

class SkillListView(ListAPIView):
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Skill.objects.all()


class SkillDetailView(RetrieveAPIView):
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        skill_id = self.kwargs.get("id")
        try:
            return Skill.objects.get(id=skill_id)
        except Skill.DoesNotExist:
            raise Http404("Skill not found")


class SkillCreateView(CreateAPIView):
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]


class SkillUpdateView(UpdateAPIView):
    serializer_class = SkillSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        skill_id = self.kwargs.get("id")
        try:
            return Skill.objects.get(id=skill_id)
        except Skill.DoesNotExist:
            raise Http404("Skill not found")


class SkillDeleteView(DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        skill_id = self.kwargs.get("id")
        try:
            return Skill.objects.get(id=skill_id)
        except Skill.DoesNotExist:
            raise Http404("Skill not found")