from rest_framework.permissions import BasePermission

class IsClientUser(BasePermission):
    """
    Allows access only to users with user_type = "client".
    """
    def has_permission(self, request, view):
        return request.user.user_type == "client"