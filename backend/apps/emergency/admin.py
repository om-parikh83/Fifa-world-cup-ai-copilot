from django.contrib import admin
from .models import EmergencyReport


@admin.register(EmergencyReport)
class EmergencyReportAdmin(admin.ModelAdmin):
    list_display = ('type', 'user', 'status', 'priority', 'location_details', 'created_at', 'resolved_at')
    list_filter = ('type', 'status', 'priority', 'created_at')
    search_fields = ('type', 'description', 'location_details', 'user__username', 'user__email')
    ordering = ('-created_at',)
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'
