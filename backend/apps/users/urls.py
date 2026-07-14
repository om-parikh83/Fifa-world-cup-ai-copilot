from django.urls import path
from .views import UserProfileViewSet

urlpatterns = [
    path('profiles/', UserProfileViewSet.as_view({'get': 'list', 'post': 'create'}), name='user-profile-list'),
    path('profiles/<int:pk>/', UserProfileViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='user-profile-detail'),
]
