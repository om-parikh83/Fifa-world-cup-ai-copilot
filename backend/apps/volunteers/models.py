from django.db import models
from django.conf import settings


class VolunteerTask(models.Model):
    PRIORITY_CHOICES = [
        ('critical', 'Critical'),
        ('high', 'High'),
        ('medium', 'Medium'),
        ('low', 'Low'),
    ]
    name = models.CharField(max_length=120)
    area = models.CharField(max_length=120)
    shift_start = models.TimeField()
    shift_end = models.TimeField()
    volunteers_required = models.IntegerField(default=1)
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='medium')
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} — {self.area}"


class VolunteerAssignment(models.Model):
    STATUS_CHOICES = [
        ('assigned', 'Assigned'),
        ('checked_in', 'Checked In'),
        ('completed', 'Completed'),
        ('absent', 'Absent'),
    ]
    volunteer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='assignments')
    task = models.ForeignKey(VolunteerTask, on_delete=models.CASCADE, related_name='assignments')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='assigned')
    check_in_time = models.DateTimeField(null=True, blank=True)
    check_out_time = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.volunteer} → {self.task}"
