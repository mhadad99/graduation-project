from django.contrib import admin
from .models import Freelancer

@admin.register(Freelancer)
class FreelancerAdmin(admin.ModelAdmin):
    list_display = ('uid', 'experience_level', 'is_verified', 'is_deleted')
    list_filter = ('experience_level', 'is_verified', 'is_deleted')
    search_fields = ('uid__email', 'uid__user_name')