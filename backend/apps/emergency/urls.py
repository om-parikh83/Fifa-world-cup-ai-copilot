from django.urls import path
from .views import EmergencyReportView

urlpatterns = [
    path('report/', EmergencyReportView.as_view(), name='emergency_report'),
]
