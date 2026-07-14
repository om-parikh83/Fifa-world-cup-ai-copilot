from django.urls import path
from .views import CrowdAnalyticsView

urlpatterns = [
    path('analytics/', CrowdAnalyticsView.as_view(), name='crowd_analytics'),
]
