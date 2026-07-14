from rest_framework import serializers
from .models import Venue, Team, Match


class VenueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venue
        fields = '__all__'


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'


class MatchSerializer(serializers.ModelSerializer):
    home_team_detail = TeamSerializer(source='home_team', read_only=True)
    away_team_detail = TeamSerializer(source='away_team', read_only=True)
    venue_detail = VenueSerializer(source='venue', read_only=True)
    score_display = serializers.ReadOnlyField()

    class Meta:
        model = Match
        fields = '__all__'
