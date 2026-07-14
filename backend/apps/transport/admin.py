from django.contrib import admin
from .models import TransitOption


@admin.register(TransitOption)
class TransitOptionAdmin(admin.ModelAdmin):
    list_display = ('mode', 'line_name', 'direction', 'interval_minutes', 'status', 'delay_reason', 'recorded_at')
    list_filter = ('mode', 'status', 'recorded_at')
    search_fields = ('line_name', 'direction', 'delay_reason')
    ordering = ('mode', 'line_name')
    readonly_fields = ('recorded_at',)
