from django.urls import path
from .views import ParkingAvailabilityView

urlpatterns = [
    path('availability/', ParkingAvailabilityView.as_view(), name='parking_availability'),
]
