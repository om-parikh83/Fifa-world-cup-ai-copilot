"""
Core Permissions — Role-Based Access Control for FIFA AI Smart Stadium Copilot
"""

from rest_framework.permissions import BasePermission


class IsAdminRole(BasePermission):
    """Only users with role='admin' can access."""

    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            hasattr(request.user, 'role') and
            request.user.role and
            request.user.role.name == 'admin'
        )


class IsStaffRole(BasePermission):
    """Users with role='staff' or 'admin' can access."""

    ALLOWED = {'admin', 'staff'}

    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            hasattr(request.user, 'role') and
            request.user.role and
            request.user.role.name in self.ALLOWED
        )


class IsSecurityRole(BasePermission):
    """Users with role='security', 'staff', or 'admin' can access."""

    ALLOWED = {'admin', 'staff', 'security'}

    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            hasattr(request.user, 'role') and
            request.user.role and
            request.user.role.name in self.ALLOWED
        )


class IsVolunteerRole(BasePermission):
    """Users with role='volunteer', 'staff', or 'admin' can access."""

    ALLOWED = {'admin', 'staff', 'volunteer'}

    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            hasattr(request.user, 'role') and
            request.user.role and
            request.user.role.name in self.ALLOWED
        )


class IsOwnerOrAdmin(BasePermission):
    """Object-level permission: owner or admin only."""

    def has_object_permission(self, request, view, obj):
        if not request.user or not request.user.is_authenticated:
            return False
        if hasattr(request.user, 'role') and request.user.role and request.user.role.name == 'admin':
            return True
        return getattr(obj, 'user', None) == request.user or getattr(obj, 'created_by', None) == request.user


class IsAuthenticatedOrReadOnly(BasePermission):
    """Full access if authenticated, read-only for anonymous."""

    def has_permission(self, request, view):
        from rest_framework.permissions import SAFE_METHODS
        return (
            request.method in SAFE_METHODS or
            (request.user and request.user.is_authenticated)
        )
