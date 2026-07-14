from django.db import models

class TransitOption(models.Model):
    mode = models.CharField(max_length=50) # 'Metro', 'Bus', etc
    line_name = models.CharField(max_length=100)
    direction = models.CharField(max_length=100, blank=True, null=True)
    interval_minutes = models.IntegerField(default=10)
    status = models.CharField(max_length=50, default='active')
    delay_reason = models.CharField(max_length=255, blank=True, null=True)
    recorded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.mode} - {self.line_name}"
