from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from rest_framework.exceptions import PermissionDenied  # Correct import for PermissionDenied
from .models import Freelancer
from user.models import CustomUser  # Correct import for CustomUser  # Import CustomUser to check user_type
from .serializers import FreelancerCreateSerializer, FreelancerOutSerializer
from rest_framework.generics import ListAPIView

class FreelancerListView(ListAPIView):
    serializer_class = FreelancerOutSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Freelancer.objects.filter(is_deleted=False)

class FreelancerCreateView(generics.CreateAPIView):
    serializer_class = FreelancerCreateSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def perform_create(self, serializer):
        user = self.request.user

        # Check if the user is already registered as a client
        if user.user_type == 'client':
            raise PermissionDenied("You are already registered as a client and cannot register as a freelancer.")

        # Check if the user is already registered as a freelancer
        if user.user_type == 'freelancer':
            raise PermissionDenied("You are already registered as a freelancer.")

        # Proceed with freelancer registration
        serializer.save(uid=user)
        user.user_type = 'freelancer'
        user.save()

class FreelancerDetailView(generics.RetrieveAPIView):
    queryset = Freelancer.objects.filter(is_deleted=False)
    serializer_class = FreelancerOutSerializer
    permission_classes = [permissions.IsAuthenticated]
    

    def get_object(self):
        # Retrieve the freelancer associated with the authenticated user
        try:
            obj = self.queryset.get(uid=self.request.user.id)
        except Freelancer.DoesNotExist:
            raise PermissionDenied("You do not have a freelancer profile.")
        return obj

class FreelancerUpdateView(generics.UpdateAPIView):
    queryset = Freelancer.objects.filter(is_deleted=False)
    serializer_class = FreelancerCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Retrieve the freelancer associated with the authenticated user
        try:
            obj = self.queryset.get(uid=self.request.user.id)
        except Freelancer.DoesNotExist:
            raise PermissionDenied("You do not have a freelancer profile to update.")
        return obj

class FreelancerDeleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request):
        try:
            freelancer = Freelancer.objects.get(uid=request.user.id, is_deleted=False)
        except Freelancer.DoesNotExist:
            return Response({"detail": "Freelancer not found"}, status=status.HTTP_404_NOT_FOUND)
        freelancer.is_deleted = True
        freelancer.save()
        return Response({"msg": "Freelancer profile marked as deleted"})