from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import EmergencyReport


class EmergencyReportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """List emergency reports. Staff/admin see all; regular users see only their own."""
        user = request.user
        is_privileged = user.is_staff or user.is_superuser or (
            hasattr(user, 'role') and user.role and user.role.name in ('admin', 'staff', 'security', 'medical')
        )
        if is_privileged:
            reports = EmergencyReport.objects.all().order_by('-created_at')[:50]
        else:
            reports = EmergencyReport.objects.filter(user=user).order_by('-created_at')[:20]

        data = [
            {
                "id": r.id,
                "type": r.type,
                "description": r.description,
                "location_details": r.location_details,
                "status": r.status,
                "priority": r.priority,
                "created_at": r.created_at,
                "resolved_at": r.resolved_at,
                "reported_by": r.user.username,
            }
            for r in reports
        ]
        return Response({"reports": data, "count": len(data)}, status=status.HTTP_200_OK)

    def post(self, request):
        """Create a new emergency report."""
        report_type = request.data.get('type')
        description = request.data.get('description')
        location = request.data.get('location_details')
        priority = request.data.get('priority', 'high')

        if not report_type or not description or not location:
            return Response(
                {"error": "Fields 'type', 'description', and 'location_details' are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        report = EmergencyReport.objects.create(
            user=request.user,
            type=report_type,
            description=description,
            location_details=location,
            priority=priority,
        )

        return Response({
            "report_id": report.id,
            "status": report.status,
            "created_at": report.created_at,
        }, status=status.HTTP_201_CREATED)
