from django.urls import path
from .views import NotificationViewSet

urlpatterns = [
    path('', NotificationViewSet.as_view({'get': 'list', 'post': 'create'}), name='notification-list'),
    path('<int:pk>/', NotificationViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='notification-detail'),
    path('mark-all-read/', NotificationViewSet.as_view({'post': 'mark_all_read'}), name='notification-mark-all-read'),
]
