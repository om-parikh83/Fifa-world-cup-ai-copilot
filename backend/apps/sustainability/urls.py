from django.urls import path
from .views import EcoMetricSnapshotViewSet

urlpatterns = [
    path('metrics/', EcoMetricSnapshotViewSet.as_view({'get': 'list', 'post': 'create'}), name='sustainability-metrics-list'),
    path('metrics/<int:pk>/', EcoMetricSnapshotViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='sustainability-metrics-detail'),
]
