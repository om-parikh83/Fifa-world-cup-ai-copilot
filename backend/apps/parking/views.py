from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

class ParkingAvailabilityView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "stadium_id": 1,
            "zones": [
                { "zone": "Zone P-B3", "total": 300, "occupied": 53, "reserved": 10, "status": "available" },
                { "zone": "Zone P-A1", "total": 500, "occupied": 482, "reserved": 15, "status": "full" }
            ]
        }, status=status.HTTP_200_OK)
