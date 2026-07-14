from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import UserProfile
from .serializers import UserProfileSerializer
from core.permissions import IsOwnerOrAdmin


class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer

    def get_permissions(self):
        if self.action in ['create']:
            return [permissions.IsAuthenticated()]
        return [IsOwnerOrAdmin()]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'role') and user.role and user.role.name == 'admin':
            return UserProfile.objects.all()
        return UserProfile.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
