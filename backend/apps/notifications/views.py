from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import models
from .models import Notification
from .serializers import NotificationSerializer
from django.utils.timezone import now
from core.utils import success_response


class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Notification.objects.filter(
            models.Q(recipient=user) | models.Q(broadcast=True)
        )

    def perform_create(self, serializer):
        serializer.save()

    @action(detail=False, methods=['post'], url_path='mark-all-read')
    def mark_all_read(self, request):
        user = self.request.user
        notifications = Notification.objects.filter(recipient=user, is_read=False)
        notifications.update(is_read=True, read_at=now())
        return success_response(message="All notifications marked as read.")
