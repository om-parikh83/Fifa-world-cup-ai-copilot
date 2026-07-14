from django.db import models

class CrowdSensorData(models.Model):
    zone_name = models.CharField(max_length=50)
    density_percentage = models.DecimalField(max_length=5, decimal_places=2, max_digits=5)
    estimated_count = models.IntegerField(default=0)
    queue_wait_minutes = models.IntegerField(default=0)
    status = models.CharField(max_length=50, default='normal')
    recorded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.zone_name} - {self.status}"
