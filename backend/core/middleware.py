"""
Core Middleware — Request logging and performance monitoring
"""

import time
import logging

logger = logging.getLogger('fifa.api')


class RequestLoggingMiddleware:
    """Logs every request with method, path, status code, and response time."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start_time = time.monotonic()

        response = self.get_response(request)

        duration_ms = (time.monotonic() - start_time) * 1000
        user = getattr(request, 'user', None)
        user_str = str(user) if user and user.is_authenticated else 'anonymous'

        logger.info(
            '[%s] %s %s → %s (%.1fms) — %s',
            request.method,
            request.path,
            request.META.get('QUERY_STRING', ''),
            response.status_code,
            duration_ms,
            user_str,
        )

        return response


class RoleHeaderMiddleware:
    """Injects X-User-Role header into every authenticated response."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        user = getattr(request, 'user', None)
        if user and user.is_authenticated and hasattr(user, 'role') and user.role:
            response['X-User-Role'] = user.role.name
        return response
