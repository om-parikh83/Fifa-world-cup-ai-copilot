from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

class TransportScheduleView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "stadium_id": 1,
            "transit_options": [
                { "mode": "Metro", "line": "Metro Line 2", "status": "delayed", "delay_minutes": 12, "reason": "Signal issue" },
                { "mode": "Shuttle Bus", "line": "Line A-Express", "status": "active", "delay_minutes": 0 }
            ]
        }, status=status.HTTP_200_OK)
