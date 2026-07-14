from django.contrib import admin
from .models import ParkingZone


@admin.register(ParkingZone)
class ParkingZoneAdmin(admin.ModelAdmin):
    list_display = ('zone_name', 'capacity_total', 'capacity_occupied', 'capacity_reserved', 'hourly_rate', 'recorded_at')
    list_filter = ('recorded_at',)
    search_fields = ('zone_name',)
    ordering = ('zone_name',)
    readonly_fields = ('recorded_at',)
