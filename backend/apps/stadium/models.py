from django.db import models


class Venue(models.Model):
    name = models.CharField(max_length=150)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=80)
    capacity = models.IntegerField()
    surface = models.CharField(max_length=50, default='Grass')
    latitude = models.DecimalField(max_digits=10, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=10, decimal_places=6, null=True, blank=True)

    def __str__(self):
        return f"{self.name}, {self.city}"


class Team(models.Model):
    code = models.CharField(max_length=5, unique=True)
    name = models.CharField(max_length=80)
    flag = models.CharField(max_length=10, blank=True)
    group = models.CharField(max_length=5, blank=True)
    fifa_ranking = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.name


class Match(models.Model):
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('live', 'Live'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    home_team = models.ForeignKey(Team, on_delete=models.RESTRICT, related_name='home_matches')
    away_team = models.ForeignKey(Team, on_delete=models.RESTRICT, related_name='away_matches')
    venue = models.ForeignKey(Venue, on_delete=models.RESTRICT, related_name='matches')
    match_date = models.DateField()
    kickoff_time = models.TimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    home_score = models.IntegerField(null=True, blank=True)
    away_score = models.IntegerField(null=True, blank=True)
    match_minute = models.IntegerField(null=True, blank=True)
    attendance = models.IntegerField(null=True, blank=True)
    stage = models.CharField(max_length=50, default='Group Stage')
    group = models.CharField(max_length=5, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.home_team} vs {self.away_team} — {self.match_date}"

    @property
    def score_display(self):
        if self.home_score is not None and self.away_score is not None:
            return f"{self.home_score}-{self.away_score}"
        return "-"
