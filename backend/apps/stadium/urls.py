from django.urls import path
from .views import VenueViewSet, TeamViewSet, MatchViewSet

urlpatterns = [
    path('venues/', VenueViewSet.as_view({'get': 'list'}), name='venue-list'),
    path('venues/<int:pk>/', VenueViewSet.as_view({'get': 'retrieve'}), name='venue-detail'),
    path('teams/', TeamViewSet.as_view({'get': 'list'}), name='team-list'),
    path('teams/<int:pk>/', TeamViewSet.as_view({'get': 'retrieve'}), name='team-detail'),
    path('matches/', MatchViewSet.as_view({'get': 'list'}), name='match-list'),
    path('matches/<int:pk>/', MatchViewSet.as_view({'get': 'retrieve'}), name='match-detail'),
]
