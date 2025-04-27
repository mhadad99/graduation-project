from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from .models import Freelancer
from .serializers import FreelancerCreateSerializer, FreelancerOutSerializer
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated

class FreelancerListView(ListAPIView):
    serializer_class = FreelancerOutSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Freelancer.objects.filter(is_deleted=False)

class FreelancerCreateView(generics.CreateAPIView):
    serializer_class = FreelancerCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(uid=self.request.user)


class FreelancerDetailView(generics.RetrieveAPIView):
    queryset = Freelancer.objects.filter(is_deleted=False)
    serializer_class = FreelancerOutSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "uid"


class FreelancerUpdateView(generics.UpdateAPIView):
    queryset = Freelancer.objects.filter(is_deleted=False)
    serializer_class = FreelancerCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "uid"

    def get_object(self):
        obj = super().get_object()
        if obj.uid != self.request.user:
            raise PermissionDenied("You do not have permission to update this profile.")
        return obj


class FreelancerDeleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, uid):
        try:
            freelancer = Freelancer.objects.get(uid=uid, is_deleted=False)
        except Freelancer.DoesNotExist:
            return Response({"detail": "Freelancer not found"}, status=status.HTTP_404_NOT_FOUND)
        freelancer.is_deleted = True
        freelancer.save()
        return Response({"msg": f"Freelancer {uid} marked as deleted"})



