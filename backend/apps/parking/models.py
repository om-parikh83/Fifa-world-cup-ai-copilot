from django.db import models

class ParkingZone(models.Model):
    zone_name = models.CharField(max_length=50)
    capacity_total = models.IntegerField()
    capacity_occupied = models.IntegerField()
    capacity_reserved = models.IntegerField(default=0)
    hourly_rate = models.DecimalField(max_digits=6, decimal_places=2, default=0.00)
    recorded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.zone_name
