"""
Core Utilities — Shared helpers across all FIFA App backend services
"""

from datetime import datetime, timezone
from rest_framework.response import Response
from rest_framework import status


# ── API Response Helpers ─────────────────────────────────────

def success_response(data=None, message="Success", status_code=status.HTTP_200_OK):
    """Standard success response wrapper."""
    return Response({
        "status": "success",
        "message": message,
        "data": data,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }, status=status_code)


def error_response(message="An error occurred", errors=None, status_code=status.HTTP_400_BAD_REQUEST):
    """Standard error response wrapper."""
    return Response({
        "status": "error",
        "message": message,
        "errors": errors,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }, status=status_code)


def paginated_response(queryset, serializer_class, request, page_size=20):
    """Simple paginated list response."""
    from rest_framework.pagination import PageNumberPagination
    paginator = PageNumberPagination()
    paginator.page_size = page_size
    result_page = paginator.paginate_queryset(queryset, request)
    serializer = serializer_class(result_page, many=True, context={'request': request})
    return paginator.get_paginated_response(serializer.data)


# ── Date/Time Helpers ────────────────────────────────────────

def utcnow():
    """Return current UTC datetime."""
    return datetime.now(timezone.utc)


def format_duration(seconds):
    """Format seconds into human-readable duration."""
    if seconds < 60:
        return f"{int(seconds)}s"
    if seconds < 3600:
        return f"{int(seconds // 60)}m {int(seconds % 60)}s"
    return f"{int(seconds // 3600)}h {int((seconds % 3600) // 60)}m"


# ── Stadium Helpers ──────────────────────────────────────────

CROWD_STATUS_THRESHOLDS = {
    "low":      (0,  50),
    "medium":   (50, 75),
    "high":     (75, 90),
    "critical": (90, 100),
}

def get_crowd_status(density_pct):
    """Return crowd status label from density percentage (0-100)."""
    for label, (low, high) in CROWD_STATUS_THRESHOLDS.items():
        if low <= density_pct < high:
            return label
    return "critical"


PARKING_ZONES = {
    "P-A1": {"name": "VIP North", "capacity": 200, "price": 85},
    "P-A2": {"name": "North",     "capacity": 500, "price": 45},
    "P-B1": {"name": "South",     "capacity": 600, "price": 40},
    "P-B2": {"name": "East",      "capacity": 400, "price": 40},
    "P-C1": {"name": "Remote",    "capacity": 800, "price": 25},
    "P-D1": {"name": "ADA",       "capacity": 100, "price": 0},
}


# ── Validation Helpers ───────────────────────────────────────

def validate_required_fields(data, fields):
    """Return list of missing required fields."""
    return [f for f in fields if not data.get(f)]


def sanitize_string(value, max_length=255):
    """Strip and truncate a string."""
    if not isinstance(value, str):
        return ""
    return value.strip()[:max_length]
