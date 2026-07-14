from django.contrib import admin
from .models import CrowdSensorData


@admin.register(CrowdSensorData)
class CrowdSensorDataAdmin(admin.ModelAdmin):
    list_display = ('zone_name', 'density_percentage', 'estimated_count', 'queue_wait_minutes', 'status', 'recorded_at')
    list_filter = ('status', 'recorded_at')
    search_fields = ('zone_name',)
    ordering = ('-recorded_at',)
    readonly_fields = ('recorded_at',)
