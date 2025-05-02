from django.contrib import admin
from .models import Client

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('uid', 'phone', 'company', 'is_deleted', 'created_at', 'updated_at')
    list_filter = ('is_deleted', 'created_at')
    search_fields = ('uid__user_name', 'uid__email', 'company')