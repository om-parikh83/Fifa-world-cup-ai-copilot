from rest_framework import serializers
from .models import EcoMetricSnapshot


class EcoMetricSnapshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = EcoMetricSnapshot
        fields = '__all__'
