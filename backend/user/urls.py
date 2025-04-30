from django.urls import path
from .views import *

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("<int:id>/", UserDetailView.as_view(), name="get-user"),
    path("all/", UserListView.as_view(), name="get-users"),
    path("update/<int:id>/", UserUpdateView.as_view(), name="update-user"),
    path("delete/<int:id>/", UserDeleteView.as_view(), name="delete-user"),
    ## Extra views for user password and photo update
    path("password/update/", UserPasswordUpdateView.as_view(), name="update-password"),
    path("photo/update/", UserPhotoUpdateView.as_view(), name="update-photo"),
]
