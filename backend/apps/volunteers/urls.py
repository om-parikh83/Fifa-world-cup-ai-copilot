from django.urls import path
from .views import VolunteerTaskViewSet, VolunteerAssignmentViewSet

urlpatterns = [
    path('tasks/', VolunteerTaskViewSet.as_view({'get': 'list', 'post': 'create'}), name='volunteer-task-list'),
    path('tasks/<int:pk>/', VolunteerTaskViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='volunteer-task-detail'),
    path('assignments/', VolunteerAssignmentViewSet.as_view({'get': 'list', 'post': 'create'}), name='volunteer-assignment-list'),
    path('assignments/<int:pk>/', VolunteerAssignmentViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='volunteer-assignment-detail'),
    path('assignments/<int:pk>/check-in/', VolunteerAssignmentViewSet.as_view({'post': 'check_in'}), name='volunteer-assignment-check-in'),
    path('assignments/<int:pk>/check-out/', VolunteerAssignmentViewSet.as_view({'post': 'check_out'}), name='volunteer-assignment-check-out'),
]
