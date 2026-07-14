import os
import sys
import django

sys.path.append(os.getcwd())
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.authentication.models import Role, User
from apps.stadium.models import Venue, Team, Match

print("Seeding database...")

# Create Roles
roles = {
    'admin': 'Administrator with full access',
    'staff': 'Stadium staff members',
    'security': 'Security personnel',
    'volunteer': 'Event volunteers',
    'fan': 'Standard fans / ticket holders',
    'medical': 'Medical emergency staff'
}

role_objs = {}
for name, desc in roles.items():
    role, created = Role.objects.get_or_create(name=name, defaults={'description': desc})
    role_objs[name] = role
    print(f"Role '{name}': {'Created' if created else 'Exists'}")

# Create Users
users_data = [
    {'email': 'admin@fifa26.com', 'username': 'admin', 'name': 'Sarah Johnson', 'role': 'admin', 'password': 'admin123', 'avatar': '👤'},
    {'email': 'fan@fifa26.com', 'username': 'fan', 'name': 'Alex Rodriguez', 'role': 'fan', 'password': 'fan123', 'avatar': '⚽'},
    {'email': 'staff@fifa26.com', 'username': 'staff', 'name': 'Mike Thompson', 'role': 'staff', 'password': 'staff123', 'avatar': '🏟️'},
    {'email': 'security@fifa26.com', 'username': 'security', 'name': 'James Wilson', 'role': 'security', 'password': 'sec123', 'avatar': '🛡️'},
    {'email': 'volunteer@fifa26.com', 'username': 'volunteer', 'name': 'Emma Davis', 'role': 'volunteer', 'password': 'vol123', 'avatar': '🤝'},
    {'email': 'medical@fifa26.com', 'username': 'medical', 'name': 'Dr. Patel', 'role': 'medical', 'password': 'med123', 'avatar': '🏥'},
]

for ud in users_data:
    user, created = User.objects.get_or_create(
        email=ud['email'],
        defaults={
            'username': ud['username'],
            'first_name': ud['name'].split()[0],
            'last_name': ud['name'].split()[1] if len(ud['name'].split()) > 1 else '',
            'role': role_objs[ud['role']],
            'avatar': ud['avatar'],
            'is_staff': ud['role'] == 'admin',
            'is_superuser': ud['role'] == 'admin',
        }
    )
    if created:
        user.set_password(ud['password'])
        user.save()
        print(f"User '{ud['email']}' created.")
    else:
        print(f"User '{ud['email']}' already exists.")

# Seed Venues
venues = [
    {"name": 'MetLife Stadium', "city": 'East Rutherford, NJ', "country": 'USA', "capacity": 82500, "surface": 'FieldTurf', "latitude": 40.8135, "longitude": -74.0745},
    {"name": 'SoFi Stadium', "city": 'Inglewood, CA', "country": 'USA', "capacity": 70240, "surface": 'Grass', "latitude": 33.9535, "longitude": -118.3392},
    {"name": 'AT&T Stadium', "city": 'Arlington, TX', "country": 'USA', "capacity": 80000, "surface": 'Bermuda', "latitude": 32.7480, "longitude": -97.0929},
]

venue_objs = {}
for v in venues:
    obj, created = Venue.objects.get_or_create(
        name=v['name'],
        defaults={
            'city': v['city'],
            'country': v['country'],
            'capacity': v['capacity'],
            'surface': v['surface'],
            'latitude': v['latitude'],
            'longitude': v['longitude']
        }
    )
    venue_objs[v['name']] = obj
    print(f"Venue '{v['name']}': {'Created' if created else 'Exists'}")

# Seed Teams
teams = [
    {"code": 'USA', "name": 'USA', "flag": '🇺🇸', "group": 'A', "fifa_ranking": 11},
    {"code": 'MEX', "name": 'Mexico', "flag": '🇲🇽', "group": 'A', "fifa_ranking": 12},
    {"code": 'BRA', "name": 'Brazil', "flag": '🇧🇷', "group": 'C', "fifa_ranking": 1},
    {"code": 'ARG', "name": 'Argentina', "flag": '🇦🇷', "group": 'C', "fifa_ranking": 2},
    {"code": 'FRA', "name": 'France', "flag": '🇫🇷', "group": 'E', "fifa_ranking": 3},
    {"code": 'GER', "name": 'Germany', "flag": '🇩🇪', "group": 'E', "fifa_ranking": 8},
]

team_objs = {}
for t in teams:
    obj, created = Team.objects.get_or_create(
        code=t['code'],
        defaults={
            'name': t['name'],
            'flag': t['flag'],
            'group': t['group'],
            'fifa_ranking': t['fifa_ranking']
        }
    )
    team_objs[t['code']] = obj
    print(f"Team '{t['name']}': {'Created' if created else 'Exists'}")

print("Database seeding completed successfully.")
