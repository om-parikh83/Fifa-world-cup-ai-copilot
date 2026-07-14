from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import VolunteerTask, VolunteerAssignment
from .serializers import VolunteerTaskSerializer, VolunteerAssignmentSerializer
from core.permissions import IsVolunteerRole, IsStaffRole
from core.utils import success_response, error_response
from django.utils.timezone import now


class VolunteerTaskViewSet(viewsets.ModelViewSet):
    queryset = VolunteerTask.objects.all()
    serializer_class = VolunteerTaskSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticated()]
        return [IsStaffRole()]


class VolunteerAssignmentViewSet(viewsets.ModelViewSet):
    queryset = VolunteerAssignment.objects.all()
    serializer_class = VolunteerAssignmentSerializer

    def get_permissions(self):
        return [permissions.IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'role') and user.role and user.role.name in ['admin', 'staff']:
            return VolunteerAssignment.objects.all()
        return VolunteerAssignment.objects.filter(volunteer=user)

    @action(detail=True, methods=['post'], url_path='check-in')
    def check_in(self, request, pk=None):
        assignment = self.get_object()
        if assignment.status != 'assigned':
            return error_response(message="Already checked in or completed.")
        assignment.status = 'checked_in'
        assignment.check_in_time = now()
        assignment.save()
        return success_response(data=VolunteerAssignmentSerializer(assignment).data, message="Successfully checked in.")

    @action(detail=True, methods=['post'], url_path='check-out')
    def check_out(self, request, pk=None):
        assignment = self.get_object()
        if assignment.status != 'checked_in':
            return error_response(message="Not checked in yet.")
        assignment.status = 'completed'
        assignment.check_out_time = now()
        assignment.save()
        return success_response(data=VolunteerAssignmentSerializer(assignment).data, message="Successfully checked out.")
