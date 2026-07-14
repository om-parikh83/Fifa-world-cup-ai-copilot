"""
Management command: seed_db
Populates all app models with realistic demo data for the FIFA World Cup 2026 AI Copilot.

Usage:
    python manage.py seed_db          # seed everything
    python manage.py seed_db --clear  # clear existing data first, then seed
"""
import datetime
from decimal import Decimal
from django.core.management.base import BaseCommand
from django.utils import timezone


class Command(BaseCommand):
    help = 'Seed the database with FIFA World Cup 2026 demo data for all apps'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing data before seeding',
        )

    def handle(self, *args, **options):
        if options['clear']:
            self.clear_data()
        self.seed_roles()
        self.seed_venues_and_teams()
        self.seed_matches()
        self.seed_parking()
        self.seed_crowd()
        self.seed_transport()
        self.seed_sustainability()
        self.seed_volunteers()
        self.stdout.write(self.style.SUCCESS('[SUCCESS] Database seeded successfully!'))

    # ─── Clear ────────────────────────────────────────────────────────────────

    def clear_data(self):
        from apps.parking.models import ParkingZone
        from apps.crowd.models import CrowdSensorData
        from apps.transport.models import TransitOption
        from apps.sustainability.models import EcoMetricSnapshot
        from apps.volunteers.models import VolunteerTask, VolunteerAssignment
        from apps.stadium.models import Match, Team, Venue
        from apps.authentication.models import Role

        self.stdout.write('Clearing existing data...')
        VolunteerAssignment.objects.all().delete()
        VolunteerTask.objects.all().delete()
        EcoMetricSnapshot.objects.all().delete()
        TransitOption.objects.all().delete()
        CrowdSensorData.objects.all().delete()
        ParkingZone.objects.all().delete()
        Match.objects.all().delete()
        Team.objects.all().delete()
        Venue.objects.all().delete()
        
        from django.contrib.auth import get_user_model
        get_user_model().objects.all().update(role=None)
        Role.objects.all().delete()
        self.stdout.write(self.style.WARNING('  Data cleared.'))

    # ─── Roles ────────────────────────────────────────────────────────────────

    def seed_roles(self):
        from apps.authentication.models import Role
        roles = [
            ('fan',       'Regular fan attending matches'),
            ('admin',     'System administrator with full access'),
            ('staff',     'Stadium operations staff'),
            ('security',  'Security personnel'),
            ('volunteer', 'Tournament volunteer'),
            ('medical',   'Medical staff / first responders'),
        ]
        for name, desc in roles:
            Role.objects.get_or_create(name=name, defaults={'description': desc})
        self.stdout.write(f'  [OK] {len(roles)} roles seeded')

    # ─── Venues & Teams ───────────────────────────────────────────────────────

    def seed_venues_and_teams(self):
        from apps.stadium.models import Venue, Team

        venues = [
            {'name': 'MetLife Stadium',    'city': 'East Rutherford', 'country': 'USA', 'capacity': 82500, 'surface': 'Grass',        'latitude': Decimal('40.8135'), 'longitude': Decimal('-74.0745')},
            {'name': 'SoFi Stadium',       'city': 'Inglewood',       'country': 'USA', 'capacity': 70240, 'surface': 'Artificial',    'latitude': Decimal('33.9535'), 'longitude': Decimal('-118.3392')},
            {'name': 'AT&T Stadium',       'city': 'Arlington',       'country': 'USA', 'capacity': 80000, 'surface': 'Grass',        'latitude': Decimal('32.7473'), 'longitude': Decimal('-97.0945')},
            {'name': 'Estadio Azteca',     'city': 'Mexico City',     'country': 'Mexico', 'capacity': 87523, 'surface': 'Grass',     'latitude': Decimal('19.3029'), 'longitude': Decimal('-99.1505')},
            {'name': 'BC Place',           'city': 'Vancouver',       'country': 'Canada', 'capacity': 54500, 'surface': 'Artificial','latitude': Decimal('49.2767'), 'longitude': Decimal('-123.1115')},
            {'name': 'BMO Field',          'city': 'Toronto',         'country': 'Canada', 'capacity': 45736, 'surface': 'Grass',     'latitude': Decimal('43.6333'), 'longitude': Decimal('-79.4186')},
        ]
        for v in venues:
            Venue.objects.get_or_create(name=v['name'], city=v['city'], defaults=v)

        teams = [
            ('BRA', 'Brazil',      '🇧🇷', 'C', 1),
            ('ARG', 'Argentina',   '🇦🇷', 'C', 2),
            ('FRA', 'France',      '🇫🇷', 'E', 3),
            ('GER', 'Germany',     '🇩🇪', 'E', 14),
            ('USA', 'United States','🇺🇸', 'A', 16),
            ('MEX', 'Mexico',      '🇲🇽', 'A', 13),
            ('ENG', 'England',     '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'B', 5),
            ('ESP', 'Spain',       '🇪🇸', 'B', 8),
            ('POR', 'Portugal',    '🇵🇹', 'D', 6),
            ('MOR', 'Morocco',     '🇲🇦', 'D', 14),
            ('JAP', 'Japan',       '🇯🇵', 'F', 17),
            ('CAN', 'Canada',      '🇨🇦', 'A', 47),
        ]
        for code, name, flag, group, ranking in teams:
            Team.objects.get_or_create(code=code, defaults={'name': name, 'flag': flag, 'group': group, 'fifa_ranking': ranking})

        self.stdout.write(f'  [OK] {len(venues)} venues and {len(teams)} teams seeded')

    # ─── Matches ──────────────────────────────────────────────────────────────

    def seed_matches(self):
        from apps.stadium.models import Match, Team, Venue

        metlife = Venue.objects.filter(name='MetLife Stadium').first()
        sofi    = Venue.objects.filter(name='SoFi Stadium').first()
        att     = Venue.objects.filter(name='AT&T Stadium').first()
        azteca  = Venue.objects.filter(name='Estadio Azteca').first()

        if not all([metlife, sofi, att, azteca]):
            self.stdout.write(self.style.WARNING('  [WARNING] Venues missing, skipping matches'))
            return

        def team(code):
            return Team.objects.filter(code=code).first()

        fixtures = [
            {'home': 'BRA', 'away': 'ARG', 'venue': metlife, 'date': '2026-07-08', 'time': '16:00', 'status': 'live', 'home_score': 2, 'away_score': 1, 'stage': 'Group Stage', 'group': 'C'},
            {'home': 'FRA', 'away': 'GER', 'venue': sofi,    'date': '2026-07-08', 'time': '19:00', 'status': 'upcoming', 'stage': 'Group Stage', 'group': 'E'},
            {'home': 'USA', 'away': 'MEX', 'venue': att,     'date': '2026-07-08', 'time': '22:00', 'status': 'upcoming', 'stage': 'Group Stage', 'group': 'A'},
            {'home': 'ENG', 'away': 'ESP', 'venue': metlife, 'date': '2026-07-10', 'time': '18:00', 'status': 'upcoming', 'stage': 'Group Stage', 'group': 'B'},
            {'home': 'POR', 'away': 'MOR', 'venue': azteca,  'date': '2026-07-10', 'time': '21:00', 'status': 'upcoming', 'stage': 'Group Stage', 'group': 'D'},
        ]

        created = 0
        for f in fixtures:
            ht = team(f['home'])
            at = team(f['away'])
            if not ht or not at:
                continue
            match_date = datetime.date.fromisoformat(f['date'])
            kickoff = datetime.time.fromisoformat(f['time'])
            _, was_created = Match.objects.get_or_create(
                home_team=ht, away_team=at, match_date=match_date,
                defaults={
                    'venue': f['venue'],
                    'kickoff_time': kickoff,
                    'status': f.get('status', 'scheduled'),
                    'home_score': f.get('home_score'),
                    'away_score': f.get('away_score'),
                    'stage': f.get('stage', 'Group Stage'),
                    'group': f.get('group', ''),
                }
            )
            if was_created:
                created += 1

        self.stdout.write(f'  [OK] {created} matches seeded')

    # ─── Parking ──────────────────────────────────────────────────────────────

    def seed_parking(self):
        from apps.parking.models import ParkingZone

        zones = [
            {'zone_name': 'Zone P-A1 (VIP)',       'capacity_total': 500, 'capacity_occupied': 482, 'capacity_reserved': 15, 'hourly_rate': Decimal('15.00')},
            {'zone_name': 'Zone P-A2 (Premium)',    'capacity_total': 450, 'capacity_occupied': 400, 'capacity_reserved': 10, 'hourly_rate': Decimal('15.00')},
            {'zone_name': 'Zone P-B1 (General)',    'capacity_total': 400, 'capacity_occupied': 260, 'capacity_reserved': 8,  'hourly_rate': Decimal('12.00')},
            {'zone_name': 'Zone P-B2 (General)',    'capacity_total': 400, 'capacity_occupied': 216, 'capacity_reserved': 5,  'hourly_rate': Decimal('12.00')},
            {'zone_name': 'Zone P-B3 (Economy)',    'capacity_total': 300, 'capacity_occupied': 53,  'capacity_reserved': 10, 'hourly_rate': Decimal('10.00')},
            {'zone_name': 'Zone P-C1 (Overflow)',   'capacity_total': 200, 'capacity_occupied': 44,  'capacity_reserved': 2,  'hourly_rate': Decimal('8.00')},
        ]
        created = 0
        for z in zones:
            _, was_created = ParkingZone.objects.get_or_create(zone_name=z['zone_name'], defaults=z)
            if was_created:
                created += 1
        self.stdout.write(f'  [OK] {created} parking zones seeded')

    # ─── Crowd ────────────────────────────────────────────────────────────────

    def seed_crowd(self):
        from apps.crowd.models import CrowdSensorData

        sensors = [
            {'zone_name': 'Gate 1 — VIP',    'density_percentage': Decimal('22.0'), 'estimated_count': 440,  'queue_wait_minutes': 2,  'status': 'normal'},
            {'zone_name': 'Gate 3 — North',  'density_percentage': Decimal('65.0'), 'estimated_count': 1300, 'queue_wait_minutes': 18, 'status': 'busy'},
            {'zone_name': 'Gate 5 — South',  'density_percentage': Decimal('85.5'), 'estimated_count': 1710, 'queue_wait_minutes': 25, 'status': 'heavy'},
            {'zone_name': 'Gate 7 — East',   'density_percentage': Decimal('32.0'), 'estimated_count': 640,  'queue_wait_minutes': 5,  'status': 'normal'},
            {'zone_name': 'Gate 9 — West',   'density_percentage': Decimal('28.5'), 'estimated_count': 570,  'queue_wait_minutes': 3,  'status': 'normal'},
            {'zone_name': 'Gate 11 — Media', 'density_percentage': Decimal('55.0'), 'estimated_count': 550,  'queue_wait_minutes': 12, 'status': 'busy'},
        ]
        created = 0
        for s in sensors:
            _, was_created = CrowdSensorData.objects.get_or_create(zone_name=s['zone_name'], defaults=s)
            if was_created:
                created += 1
        self.stdout.write(f'  [OK] {created} crowd sensor readings seeded')

    # ─── Transport ────────────────────────────────────────────────────────────

    def seed_transport(self):
        from apps.transport.models import TransitOption

        options = [
            {'mode': 'Metro',       'line_name': 'Metro Line 1',    'direction': 'Stadium → Downtown',   'interval_minutes': 8,  'status': 'active',  'delay_reason': None},
            {'mode': 'Metro',       'line_name': 'Metro Line 2',    'direction': 'Airport → Stadium',    'interval_minutes': 12, 'status': 'delayed', 'delay_reason': 'Signal issue near Central Station'},
            {'mode': 'Shuttle Bus', 'line_name': 'Line A-Express',  'direction': 'P-A1 → Gate 5',        'interval_minutes': 5,  'status': 'active',  'delay_reason': None},
            {'mode': 'Shuttle Bus', 'line_name': 'Line B-Standard', 'direction': 'P-B3 → Gate 1',        'interval_minutes': 10, 'status': 'active',  'delay_reason': None},
            {'mode': 'Light Rail',  'line_name': 'Green Line',      'direction': 'City Center → Stadium', 'interval_minutes': 15, 'status': 'active',  'delay_reason': None},
            {'mode': 'Walking',     'line_name': 'Pedestrian Route', 'direction': 'Parking → Main Gate',  'interval_minutes': 0,  'status': 'active',  'delay_reason': None},
        ]
        created = 0
        for opt in options:
            _, was_created = TransitOption.objects.get_or_create(line_name=opt['line_name'], defaults=opt)
            if was_created:
                created += 1
        self.stdout.write(f'  [OK] {created} transport options seeded')

    # ─── Sustainability ───────────────────────────────────────────────────────

    def seed_sustainability(self):
        from apps.sustainability.models import EcoMetricSnapshot

        snapshots = [
            {'date': datetime.date(2026, 7, 5),  'carbon_saved_tonnes': 125.4, 'renewable_energy_pct': 68.2, 'water_recycled_pct': 72.1, 'waste_recycled_pct': 81.5, 'ev_count': 1240, 'solar_kwh': 4820.0, 'plastic_bottles_avoided': 18500, 'trees_planted': 25, 'eco_score': 77.8},
            {'date': datetime.date(2026, 7, 6),  'carbon_saved_tonnes': 138.2, 'renewable_energy_pct': 70.5, 'water_recycled_pct': 74.3, 'waste_recycled_pct': 83.0, 'ev_count': 1380, 'solar_kwh': 5100.0, 'plastic_bottles_avoided': 20100, 'trees_planted': 30, 'eco_score': 80.1},
            {'date': datetime.date(2026, 7, 7),  'carbon_saved_tonnes': 142.0, 'renewable_energy_pct': 72.0, 'water_recycled_pct': 75.5, 'waste_recycled_pct': 84.0, 'ev_count': 1420, 'solar_kwh': 5350.0, 'plastic_bottles_avoided': 21500, 'trees_planted': 32, 'eco_score': 81.5},
            {'date': datetime.date(2026, 7, 8),  'carbon_saved_tonnes': 156.8, 'renewable_energy_pct': 74.3, 'water_recycled_pct': 78.2, 'waste_recycled_pct': 85.6, 'ev_count': 1580, 'solar_kwh': 5680.0, 'plastic_bottles_avoided': 23400, 'trees_planted': 38, 'eco_score': 83.7},
        ]
        created = 0
        for s in snapshots:
            _, was_created = EcoMetricSnapshot.objects.get_or_create(date=s['date'], defaults=s)
            if was_created:
                created += 1
        self.stdout.write(f'  [OK] {created} eco metric snapshots seeded')

    # ─── Volunteers ───────────────────────────────────────────────────────────

    def seed_volunteers(self):
        from apps.volunteers.models import VolunteerTask

        tasks = [
            {'name': 'Gate 5 Crowd Control',  'area': 'Gate 5 — South',    'shift_start': datetime.time(13, 0), 'shift_end': datetime.time(22, 0), 'volunteers_required': 8,  'priority': 'critical', 'description': 'Manage heavy congestion at Gate 5. Redirect fans when density exceeds 80%.'},
            {'name': 'VIP Escort Service',    'area': 'Gate 1 — VIP',      'shift_start': datetime.time(14, 0), 'shift_end': datetime.time(23, 0), 'volunteers_required': 4,  'priority': 'high',     'description': 'Escort VIP guests from Gate 1 to designated seating areas.'},
            {'name': 'Info Desk — North',     'area': 'Gate 3 — North',    'shift_start': datetime.time(12, 0), 'shift_end': datetime.time(21, 0), 'volunteers_required': 6,  'priority': 'medium',   'description': 'Staff the fan information desk, answer questions in multiple languages.'},
            {'name': 'Eco Station Monitor',   'area': 'Sustainability Hub', 'shift_start': datetime.time(10, 0), 'shift_end': datetime.time(20, 0), 'volunteers_required': 3,  'priority': 'medium',   'description': 'Monitor eco stations, encourage recycling, track plastic bottle reduction.'},
            {'name': 'Shuttle Bus Marshal',   'area': 'Parking P-A1',      'shift_start': datetime.time(12, 0), 'shift_end': datetime.time(22, 0), 'volunteers_required': 5,  'priority': 'high',     'description': 'Marshal fans onto shuttle buses, maintain orderly queues at parking area.'},
            {'name': 'Medical First Aid',     'area': 'Medical Bay — South','shift_start': datetime.time(12, 0), 'shift_end': datetime.time(23, 0), 'volunteers_required': 4,  'priority': 'critical', 'description': 'Staff the first aid station. Certified first aiders only.'},
            {'name': 'Post-Match Exit Guide', 'area': 'All Gates',          'shift_start': datetime.time(19, 0), 'shift_end': datetime.time(23, 59), 'volunteers_required': 12, 'priority': 'high',     'description': 'Guide fans to exits and transport points after the final whistle.'},
        ]
        created = 0
        for t in tasks:
            _, was_created = VolunteerTask.objects.get_or_create(name=t['name'], defaults=t)
            if was_created:
                created += 1
        self.stdout.write(f'  [OK] {created} volunteer tasks seeded')
