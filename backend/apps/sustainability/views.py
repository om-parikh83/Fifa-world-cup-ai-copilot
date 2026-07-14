from rest_framework import viewsets, permissions
from .models import EcoMetricSnapshot
from .serializers import EcoMetricSnapshotSerializer
from core.permissions import IsStaffRole


class EcoMetricSnapshotViewSet(viewsets.ModelViewSet):
    queryset = EcoMetricSnapshot.objects.all()
    serializer_class = EcoMetricSnapshotSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        return [IsStaffRole()]
