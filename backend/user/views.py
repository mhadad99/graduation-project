from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from .models import CustomUser
from .serializers import (
    UserCreateSerializer,
    UserOutSerializer,
    UserLoginSerializer,
    UserPasswordUpdateSerializer,
    UserPhotoUpdateSerializer,
    UserUpdateSerializer,
)
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.parsers import MultiPartParser, FormParser


class RegisterView(generics.CreateAPIView):
    serializer_class = UserCreateSerializer
    queryset = CustomUser.objects.all()
    parser_classes = [MultiPartParser, FormParser]


class LoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            request,
            email=serializer.validated_data["email"],
            password=serializer.validated_data["password"],
        )
        if not user or user.is_deleted:
            return Response(
                {"detail": "Invalid credentials"}, status=status.HTTP_403_FORBIDDEN
            )
        user_data = UserOutSerializer(user).data
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "access_token": str(refresh.access_token),
                "token_type": "bearer",
                "user": user_data,
            }
        )


class UserDetailView(generics.RetrieveAPIView):
    queryset = CustomUser.objects.filter(is_deleted=False)
    serializer_class = UserOutSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "id"


class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.filter(is_deleted=False)
    serializer_class = UserOutSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserUpdateView(generics.UpdateAPIView):
    queryset = CustomUser.objects.filter(is_deleted=False)
    serializer_class = UserUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = "id"


class UserDeleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, id):
        try:
            user = CustomUser.objects.get(id=id, is_deleted=False)
        except CustomUser.DoesNotExist:
            return Response({"detail": "User not found"}, status=404)
        user.is_deleted = True
        user.save()
        return Response({"msg": f"User {id} marked as deleted"})


# Extra views for user password and photo update


class UserPasswordUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request):
        serializer = UserPasswordUpdateSerializer(
            data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"detail": "Password updated successfully."})


class UserPhotoUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def patch(self, request):
        user = request.user
        serializer = UserPhotoUpdateSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
