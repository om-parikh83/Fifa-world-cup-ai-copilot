from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import TransitOption


class TransportScheduleView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        options = TransitOption.objects.all().order_by('mode', 'line_name')

        if not options.exists():
            # Fallback demo data if DB has no records yet
            return Response({
                "stadium_id": 1,
                "transit_options": [
                    {"mode": "Metro",        "line": "Metro Line 1",       "direction": "Stadium → Downtown", "interval_minutes": 8,  "status": "active",  "delay_minutes": 0,  "reason": None},
                    {"mode": "Metro",        "line": "Metro Line 2",       "direction": "Airport → Stadium",  "interval_minutes": 12, "status": "delayed", "delay_minutes": 12, "reason": "Signal issue near Central Station"},
                    {"mode": "Shuttle Bus",  "line": "Line A-Express",    "direction": "Parking P-A1 → Gate 5", "interval_minutes": 5, "status": "active",  "delay_minutes": 0, "reason": None},
                    {"mode": "Shuttle Bus",  "line": "Line B-Standard",   "direction": "Parking P-B3 → Gate 1", "interval_minutes": 10, "status": "active", "delay_minutes": 0, "reason": None},
                    {"mode": "Light Rail",   "line": "Green Line",         "direction": "City Center → Stadium", "interval_minutes": 15, "status": "active", "delay_minutes": 0, "reason": None},
                    {"mode": "Walking",      "line": "Pedestrian Route",   "direction": "Parking → Main Gate",   "interval_minutes": 0,  "status": "active", "delay_minutes": 0, "reason": None},
                ]
            }, status=status.HTTP_200_OK)

        option_list = []
        for opt in options:
            option_list.append({
                "mode": opt.mode,
                "line": opt.line_name,
                "direction": opt.direction,
                "interval_minutes": opt.interval_minutes,
                "status": opt.status,
                "delay_reason": opt.delay_reason,
                "recorded_at": opt.recorded_at,
            })

        return Response({
            "stadium_id": 1,
            "transit_options": option_list,
        }, status=status.HTTP_200_OK)
