from django.db import models
from django.contrib.auth.models import AbstractUser

class Role(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class User(AbstractUser):
    avatar = models.CharField(max_length=50, default='👤')
    preferred_language = models.CharField(max_length=10, default='en')
    role = models.ForeignKey(Role, on_delete=models.RESTRICT, null=True, blank=True)

    # Resolve reverse relationships conflicts
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='fifa_user_groups',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='fifa_user_permissions',
        blank=True
    )

    @property
    def name(self):
        full_name = f"{self.first_name} {self.last_name}".strip()
        return full_name if full_name else self.username

    def __str__(self):
        return self.email or self.username
