from django.db import models
from django.conf import settings


class Notification(models.Model):
    CHANNEL_CHOICES = [
        ('push', 'Push'),
        ('email', 'Email'),
        ('sms', 'SMS'),
        ('in_app', 'In-App'),
    ]
    TYPE_CHOICES = [
        ('alert', 'Alert'),
        ('info', 'Info'),
        ('match', 'Match Update'),
        ('parking', 'Parking'),
        ('transport', 'Transport'),
        ('emergency', 'Emergency'),
    ]
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications', null=True, blank=True)
    broadcast = models.BooleanField(default=False, help_text='Send to all users')
    channel = models.CharField(max_length=20, choices=CHANNEL_CHOICES, default='in_app')
    notification_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='info')
    title = models.CharField(max_length=200)
    body = models.TextField()
    is_read = models.BooleanField(default=False)
    sent_at = models.DateTimeField(auto_now_add=True)
    read_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-sent_at']

    def __str__(self):
        return f"[{self.notification_type.upper()}] {self.title}"
