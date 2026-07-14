from rest_framework import serializers
from .models import VolunteerTask, VolunteerAssignment
from ..authentication.serializers import UserSerializer


class VolunteerTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = VolunteerTask
        fields = '__all__'


class VolunteerAssignmentSerializer(serializers.ModelSerializer):
    volunteer_detail = UserSerializer(source='volunteer', read_only=True)
    task_detail = VolunteerTaskSerializer(source='task', read_only=True)

    class Meta:
        model = VolunteerAssignment
        fields = '__all__'
