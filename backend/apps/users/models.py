from django.db import models
from django.conf import settings


class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    bio = models.TextField(blank=True, default='')
    preferred_language = models.CharField(max_length=10, default='en')
    nationality = models.CharField(max_length=60, blank=True)
    favorite_team = models.CharField(max_length=60, blank=True)
    tickets_booked = models.IntegerField(default=0)
    matches_attended = models.IntegerField(default=0)
    notifications_enabled = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Profile of {self.user}"
