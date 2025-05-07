# Create your views here.
# views.py
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework import generics, status
from rest_framework.response import Response
from user.models import CustomUser
from project.enums import Progress
from project.serializers import (
    ProjectCreateSerializer,
    ProjectSerializer,
    ProjectUpdateSerializer,
)
from .models import Project
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

# Create


class ProjectCreateView(generics.CreateAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        print("User Type:", user.user_type)  # Debugging line

        if user.user_type != "client":
            raise PermissionDenied("Only clients can create projects.")

        serializer.save(clientId=user)


# List
class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.exclude(progress=Progress.CANCELLED)


# Retrieve (get one)
class ProjectRetrieveView(generics.RetrieveAPIView):
    queryset = Project.objects.select_related('clientId')
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data
        
        # Add user IDs to response
        return Response(data)

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


# Special view to get all projects by a specific client


class ProjectsByCurrentClientView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if user.user_type != "client":
            raise PermissionDenied("Only clients can view their projects.")

        if not hasattr(user, "client_profile"):
            raise NotFound("Client profile not found for this user.")

        return Project.objects.filter(clientId=user).exclude(
            progress=Progress.CANCELLED
        )


class ProjectsByUserIdView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        user_id = self.kwargs.get("user_id")

        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            raise NotFound("User not found.")

        if user.user_type != "client":
            raise NotFound("This user is not a client.")

        return Project.objects.filter(clientId=user).exclude(
            progress=Progress.CANCELLED
        )

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        if not queryset.exists():
            return Response(
                {"detail": "Client has no projects yet."}, status=status.HTTP_200_OK
            )

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


# Complete project route


class ProjectCompleteView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        project = get_object_or_404(Project, id=pk)

        if project.clientId != request.user:
            raise PermissionDenied("You are not the owner of this project.")

        if project.progress != Progress.IN_PROGRESS:
            return Response(
                {"detail": "Only in-progress projects can be marked as completed."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        project.progress = Progress.COMPLETED
        project.save()

        return Response(
            {"detail": "Project marked as completed."}, status=status.HTTP_200_OK
        )


class ProjectDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        project = get_object_or_404(Project, id=pk)

        if project.clientId != request.user:
            raise PermissionDenied("You are not the owner of this project.")

        if project.progress != Progress.NOT_STARTED:
            return Response(
                {"detail": "Only projects that haven't started can be deleted."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        project.delete()
        return Response(
            {"detail": "Project deleted successfully."}, status=status.HTTP_200_OK
        )
