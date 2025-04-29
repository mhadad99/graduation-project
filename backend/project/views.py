from django.shortcuts import render

# Create your views here.
# views.py
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from project import serializer
from project.enums import Progress
from project.serializer import (
    ProjectCreateSerializer,
    ProjectSerializer,
    ProjectUpdateSerializer,
)
from .models import Project


# Create
class ProjectCreateView(generics.CreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectCreateSerializer
    permission_classes = [IsAuthenticated]


# List
class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.exclude(progress=Progress.CANCELLED)


# Retrieve (get one)
class ProjectRetrieveView(generics.RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectUpdateSerializer
    permission_classes = [IsAuthenticated]


# class ProjectsByFreelancerView(generics.ListAPIView):
#     serializer_class = ProjectSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         freelancer_id = self.kwargs["freelancer_id"]
#         return Project.objects.exclude(progress=Progress.CANCELLED)


# class ProjectsByClientView(generics.ListAPIView):
#     serializer_class = ProjectSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         client_id = self.kwargs["client_id"]
#         return Project.objects.filter(
#             client_id=clientId, progress__ne=Progress.CANCELLED
#         )


class ProjectUpdateView(generics.UpdateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectUpdateSerializer
    permission_classes = [IsAuthenticated]

    # Optional: customize update behavior by overriding perform_update()
    def perform_update(self, serializer):
        serializer.save()


# Delete
class ProjectDeleteView(generics.DestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def perform_destroy(self, instance):
        instance.progress = Progress.CANCELLED
        instance.save()
