from django.urls import path
from .views import TransportScheduleView

urlpatterns = [
    path('schedule/', TransportScheduleView.as_view(), name='transport_schedule'),
]
