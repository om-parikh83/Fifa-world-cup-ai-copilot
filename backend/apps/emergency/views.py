from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import EmergencyReport

class EmergencyReportView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        report_type = request.data.get('type')
        description = request.data.get('description')
        location = request.data.get('location_details')
        priority = request.data.get('priority', 'high')

        report = EmergencyReport.objects.create(
            user=request.user,
            type=report_type,
            description=description,
            location_details=location,
            priority=priority
        )

        return Response({
            "report_id": report.id,
            "status": report.status,
            "created_at": report.created_at
        }, status=status.HTTP_201_CREATED)
