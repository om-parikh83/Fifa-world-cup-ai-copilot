from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

class CrowdAnalyticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Simulated crowd intelligence details
        return Response({
            "stadium_id": 1,
            "overall_crowd_status": "heavy",
            "zones": [
                { "zone": "Gate 5", "density_pct": 85.5, "wait_minutes": 25, "status": "heavy" },
                { "zone": "Gate 7", "density_pct": 32.0, "wait_minutes": 5, "status": "normal" },
                { "zone": "Gate 9", "density_pct": 28.5, "wait_minutes": 3, "status": "normal" }
            ],
            "recommendation": "Divert arriving fans at Gate 5 to Gate 7 and 9 immediately."
        }, status=status.HTTP_200_OK)
