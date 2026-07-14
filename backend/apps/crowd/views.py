from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import CrowdSensorData


class CrowdAnalyticsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get the most recent reading per zone
        from django.db.models import Max
        latest_ids = (
            CrowdSensorData.objects
            .values('zone_name')
            .annotate(latest=Max('recorded_at'))
            .values_list('latest', flat=True)
        )
        zones = CrowdSensorData.objects.filter(recorded_at__in=latest_ids).order_by('zone_name')

        if not zones.exists():
            # Fallback demo data if DB has no records yet
            return Response({
                "stadium_id": 1,
                "overall_crowd_status": "heavy",
                "zones": [
                    {"zone": "Gate 1 — VIP",    "density_pct": 22.0,  "estimated_count": 440,  "queue_wait_minutes": 2,  "status": "normal"},
                    {"zone": "Gate 3 — North",  "density_pct": 65.0,  "estimated_count": 1300, "queue_wait_minutes": 18, "status": "busy"},
                    {"zone": "Gate 5 — South",  "density_pct": 85.5,  "estimated_count": 1710, "queue_wait_minutes": 25, "status": "heavy"},
                    {"zone": "Gate 7 — East",   "density_pct": 32.0,  "estimated_count": 640,  "queue_wait_minutes": 5,  "status": "normal"},
                    {"zone": "Gate 9 — West",   "density_pct": 28.5,  "estimated_count": 570,  "queue_wait_minutes": 3,  "status": "normal"},
                    {"zone": "Gate 11 — Media", "density_pct": 55.0,  "estimated_count": 550,  "queue_wait_minutes": 12, "status": "busy"},
                ],
                "recommendation": "Divert arriving fans at Gate 5 to Gate 7 and Gate 9 immediately.",
            }, status=status.HTTP_200_OK)

        zone_list = []
        for z in zones:
            zone_list.append({
                "zone": z.zone_name,
                "density_pct": float(z.density_percentage),
                "estimated_count": z.estimated_count,
                "queue_wait_minutes": z.queue_wait_minutes,
                "status": z.status,
                "recorded_at": z.recorded_at,
            })

        # Compute overall status
        avg_density = sum(z["density_pct"] for z in zone_list) / len(zone_list) if zone_list else 0
        if avg_density >= 80:
            overall_status = "critical"
        elif avg_density >= 60:
            overall_status = "heavy"
        elif avg_density >= 40:
            overall_status = "busy"
        else:
            overall_status = "normal"

        # Build recommendation for the busiest gate
        busiest = max(zone_list, key=lambda z: z["density_pct"]) if zone_list else None
        recommendation = (
            f"Divert fans from {busiest['zone']} (density {busiest['density_pct']}%) to less congested gates."
            if busiest and busiest["density_pct"] > 70
            else "All gates operating within normal parameters."
        )

        return Response({
            "stadium_id": 1,
            "overall_crowd_status": overall_status,
            "avg_density_pct": round(avg_density, 1),
            "zones": zone_list,
            "recommendation": recommendation,
        }, status=status.HTTP_200_OK)
