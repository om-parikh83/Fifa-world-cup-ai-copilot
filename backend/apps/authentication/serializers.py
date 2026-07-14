from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Role

User = get_user_model()

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name', 'description']

class UserSerializer(serializers.ModelSerializer):
    role = serializers.CharField(source='role.name', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'avatar', 'preferred_language', 'role']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'preferred_language']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            preferred_language=validated_data.get('preferred_language', 'en')
        )
        # Assign default 'fan' role if it exists
        default_role = Role.objects.filter(name='fan').first()
        if default_role:
            user.role = default_role
            user.save()
        return user
