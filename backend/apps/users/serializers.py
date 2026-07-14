from rest_framework import serializers
from .models import UserProfile
from ..authentication.serializers import UserSerializer


class UserProfileSerializer(serializers.ModelSerializer):
    user_detail = UserSerializer(source='user', read_only=True)

    class Meta:
        model = UserProfile
        fields = '__all__'
