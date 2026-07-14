from django.contrib import admin
from .models import EcoMetricSnapshot


@admin.register(EcoMetricSnapshot)
class EcoMetricSnapshotAdmin(admin.ModelAdmin):
    list_display = (
        'date', 'eco_score', 'carbon_saved_tonnes', 'renewable_energy_pct',
        'water_recycled_pct', 'waste_recycled_pct', 'ev_count', 'solar_kwh', 'trees_planted'
    )
    list_filter = ('date',)
    ordering = ('-date',)
    readonly_fields = ('created_at',)
    date_hierarchy = 'date'
