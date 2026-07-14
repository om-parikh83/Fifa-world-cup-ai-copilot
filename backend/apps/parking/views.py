from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import ParkingZone


class ParkingAvailabilityView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        zones = ParkingZone.objects.all().order_by('zone_name')

        if not zones.exists():
            # Fallback demo data if DB has no records yet
            return Response({
                "stadium_id": 1,
                "zones": [
                    {"zone": "Zone P-A1", "total": 500, "occupied": 482, "reserved": 15, "hourly_rate": "15.00", "status": "full"},
                    {"zone": "Zone P-A2", "total": 450, "occupied": 400, "reserved": 10, "hourly_rate": "15.00", "status": "busy"},
                    {"zone": "Zone P-B1", "total": 400, "occupied": 260, "reserved": 8, "hourly_rate": "12.00", "status": "available"},
                    {"zone": "Zone P-B2", "total": 400, "occupied": 216, "reserved": 5, "hourly_rate": "12.00", "status": "available"},
                    {"zone": "Zone P-B3", "total": 300, "occupied": 53, "reserved": 10, "hourly_rate": "10.00", "status": "available"},
                    {"zone": "Zone P-C1", "total": 200, "occupied": 44, "reserved": 2, "hourly_rate": "8.00", "status": "available"},
                ]
            }, status=status.HTTP_200_OK)

        zone_list = []
        for z in zones:
            available = z.capacity_total - z.capacity_occupied - z.capacity_reserved
            if z.capacity_occupied >= z.capacity_total * 0.95:
                zone_status = "full"
            elif z.capacity_occupied >= z.capacity_total * 0.80:
                zone_status = "busy"
            else:
                zone_status = "available"

            zone_list.append({
                "zone": z.zone_name,
                "total": z.capacity_total,
                "occupied": z.capacity_occupied,
                "reserved": z.capacity_reserved,
                "available": max(available, 0),
                "hourly_rate": str(z.hourly_rate),
                "status": zone_status,
                "recorded_at": z.recorded_at,
            })

        total_spots = sum(z["total"] for z in zone_list)
        total_occupied = sum(z["occupied"] for z in zone_list)

        return Response({
            "stadium_id": 1,
            "total_spots": total_spots,
            "total_occupied": total_occupied,
            "total_available": total_spots - total_occupied,
            "zones": zone_list,
        }, status=status.HTTP_200_OK)
