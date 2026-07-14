from django.contrib import admin
from .models import Venue, Team, Match


@admin.register(Venue)
class VenueAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'country', 'capacity', 'surface')
    list_filter = ('country', 'surface')
    search_fields = ('name', 'city', 'country')
    ordering = ('country', 'city')


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'flag', 'group', 'fifa_ranking')
    list_filter = ('group',)
    search_fields = ('code', 'name')
    ordering = ('group', 'fifa_ranking')


@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ('home_team', 'away_team', 'venue', 'match_date', 'kickoff_time', 'status', 'score_display', 'stage', 'group')
    list_filter = ('status', 'stage', 'group', 'match_date')
    search_fields = ('home_team__name', 'away_team__name', 'venue__name')
    ordering = ('match_date', 'kickoff_time')
    date_hierarchy = 'match_date'
    raw_id_fields = ('home_team', 'away_team', 'venue')
