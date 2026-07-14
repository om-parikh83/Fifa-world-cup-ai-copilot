from django.db import models
from django.conf import settings

class EmergencyReport(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    type = models.CharField(max_length=100) # 'medical', 'security', 'fire', 'hazard'
    description = models.TextField()
    location_details = models.CharField(max_length=255)
    status = models.CharField(max_length=50, default='reported')
    priority = models.CharField(max_length=20, default='high')
    created_at = models.DateTimeField(auto_now_add=True)
    resolved_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.type} - {self.status} ({self.priority})"
