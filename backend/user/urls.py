from django.urls import path
from .views import *

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("user-profile/", UserMeView.as_view(), name="user-me"),
    path("user-profile/<int:id>/", UserDetailByIdView.as_view(), name="user-detail"),
    path("all/", UserListView.as_view(), name="get-users"),
    path("update/", UserUpdateView.as_view(), name="update-user"),
    path("delete/<int:id>/", UserDeleteView.as_view(), name="delete-user"),
    ## Extra views for user password and photo update
    path("password/update/", UserPasswordUpdateView.as_view(), name="update-password"),
    path("photo/update/", UserPhotoUpdateView.as_view(), name="update-photo"),
]
