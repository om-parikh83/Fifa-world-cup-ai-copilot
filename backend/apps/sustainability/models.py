from django.db import models


class EcoMetricSnapshot(models.Model):
    """Daily eco metrics snapshot for the tournament."""
    date = models.DateField(unique=True)
    carbon_saved_tonnes = models.FloatField(default=0)
    renewable_energy_pct = models.FloatField(default=0)
    water_recycled_pct = models.FloatField(default=0)
    waste_recycled_pct = models.FloatField(default=0)
    ev_count = models.IntegerField(default=0)
    solar_kwh = models.FloatField(default=0)
    plastic_bottles_avoided = models.IntegerField(default=0)
    trees_planted = models.IntegerField(default=0)
    eco_score = models.FloatField(default=0, help_text="Overall eco grade 0-100")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"EcoMetrics — {self.date} (score: {self.eco_score})"

    class Meta:
        ordering = ['-date']
        verbose_name = 'Eco Metric Snapshot'
