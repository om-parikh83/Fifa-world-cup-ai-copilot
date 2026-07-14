// ============================================================
// FIFA World Cup 2026 — Real Data Constants
// ============================================================

export const FIFA_2026 = {
  year: 2026,
  hosts: ['USA', 'Canada', 'Mexico'],
  tagline: 'The Greatest Show on Earth',
  totalTeams: 48,
  totalMatches: 104,
  totalVenues: 16,
};

// ── TEAMS ──────────────────────────────────────────────────
export const TEAMS = [
  { id: 1,  code: 'BRA', name: 'Brazil',      flag: '🇧🇷', group: 'C', color: '#009c3b', ranking: 1 },
  { id: 2,  code: 'ARG', name: 'Argentina',   flag: '🇦🇷', group: 'C', color: '#74acdf', ranking: 2 },
  { id: 3,  code: 'FRA', name: 'France',      flag: '🇫🇷', group: 'E', color: '#0055a4', ranking: 3 },
  { id: 4,  code: 'ENG', name: 'England',     flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'B', color: '#FFFFFF', ranking: 4 },
  { id: 5,  code: 'BEL', name: 'Belgium',     flag: '🇧🇪', group: 'D', color: '#ef3340', ranking: 5 },
  { id: 6,  code: 'ESP', name: 'Spain',       flag: '🇪🇸', group: 'A', color: '#c60b1e', ranking: 6 },
  { id: 7,  code: 'POR', name: 'Portugal',    flag: '🇵🇹', group: 'F', color: '#006600', ranking: 7 },
  { id: 8,  code: 'GER', name: 'Germany',     flag: '🇩🇪', group: 'E', color: '#000000', ranking: 8 },
  { id: 9,  code: 'NED', name: 'Netherlands', flag: '🇳🇱', group: 'A', color: '#ff6600', ranking: 9 },
  { id: 10, code: 'URU', name: 'Uruguay',     flag: '🇺🇾', group: 'H', color: '#75aadb', ranking: 10 },
  { id: 11, code: 'USA', name: 'USA',         flag: '🇺🇸', group: 'A', color: '#002868', ranking: 11 },
  { id: 12, code: 'MEX', name: 'Mexico',      flag: '🇲🇽', group: 'A', color: '#006847', ranking: 12 },
  { id: 13, code: 'COL', name: 'Colombia',    flag: '🇨🇴', group: 'G', color: '#fcd116', ranking: 13 },
  { id: 14, code: 'CAN', name: 'Canada',      flag: '🇨🇦', group: 'B', color: '#ff0000', ranking: 14 },
  { id: 15, code: 'MAR', name: 'Morocco',     flag: '🇲🇦', group: 'F', color: '#c1272d', ranking: 15 },
  { id: 16, code: 'SEN', name: 'Senegal',     flag: '🇸🇳', group: 'H', color: '#00853f', ranking: 16 },
  { id: 17, code: 'JPN', name: 'Japan',       flag: '🇯🇵', group: 'D', color: '#bc002d', ranking: 17 },
  { id: 18, code: 'KOR', name: 'South Korea', flag: '🇰🇷', group: 'G', color: '#003478', ranking: 18 },
  { id: 19, code: 'AUS', name: 'Australia',   flag: '🇦🇺', group: 'B', color: '#00843d', ranking: 19 },
  { id: 20, code: 'CRO', name: 'Croatia',     flag: '🇭🇷', group: 'F', color: '#ff0000', ranking: 20 },
  { id: 21, code: 'SUI', name: 'Switzerland', flag: '🇨🇭', group: 'H', color: '#ff0000', ranking: 21 },
  { id: 22, code: 'DEN', name: 'Denmark',     flag: '🇩🇰', group: 'D', color: '#c60c30', ranking: 22 },
  { id: 23, code: 'ECU', name: 'Ecuador',     flag: '🇪🇨', group: 'G', color: '#ffd100', ranking: 23 },
  { id: 24, code: 'IRN', name: 'Iran',        flag: '🇮🇷', group: 'C', color: '#239f40', ranking: 24 },
];

// ── VENUES ─────────────────────────────────────────────────
export const VENUES = [
  { id: 1,  name: 'MetLife Stadium',       city: 'East Rutherford, NJ', country: 'USA', capacity: 82500,  lat: 40.8135, lng: -74.0745, surface: 'FieldTurf', host: 'Final', image: '🏟️' },
  { id: 2,  name: 'SoFi Stadium',          city: 'Inglewood, CA',       country: 'USA', capacity: 70240,  lat: 33.9535, lng: -118.3392, surface: 'Grass',     host: 'SF, QF', image: '🏟️' },
  { id: 3,  name: 'AT&T Stadium',          city: 'Arlington, TX',       country: 'USA', capacity: 80000,  lat: 32.7480, lng: -97.0929, surface: 'Bermuda',   host: 'QF', image: '🏟️' },
  { id: 4,  name: 'Levi\'s Stadium',       city: 'Santa Clara, CA',     country: 'USA', capacity: 68500,  lat: 37.4033, lng: -121.9694, surface: 'Grass',    host: 'GS', image: '🏟️' },
  { id: 5,  name: 'Rose Bowl Stadium',     city: 'Pasadena, CA',        country: 'USA', capacity: 90888,  lat: 34.1613, lng: -118.1676, surface: 'Grass',    host: 'GS', image: '🏟️' },
  { id: 6,  name: 'Estadio Azteca',        city: 'Mexico City',         country: 'MEX', capacity: 87600,  lat: 19.3029, lng: -99.1505, surface: 'Grass',    host: 'GS, OF', image: '🏟️' },
  { id: 7,  name: 'Gillette Stadium',      city: 'Foxborough, MA',      country: 'USA', capacity: 65878,  lat: 42.0909, lng: -71.2643, surface: 'FieldTurf', host: 'GS', image: '🏟️' },
  { id: 8,  name: 'Arrowhead Stadium',     city: 'Kansas City, MO',     country: 'USA', capacity: 76416,  lat: 39.0489, lng: -94.4839, surface: 'Grass',    host: 'GS', image: '🏟️' },
  { id: 9,  name: 'Allegiant Stadium',     city: 'Las Vegas, NV',       country: 'USA', capacity: 65000,  lat: 36.0909, lng: -115.1833, surface: 'Grass',   host: 'GS', image: '🏟️' },
  { id: 10, name: 'Lincoln Financial Field', city: 'Philadelphia, PA',  country: 'USA', capacity: 69176,  lat: 39.9008, lng: -75.1675, surface: 'FieldTurf', host: 'GS', image: '🏟️' },
  { id: 11, name: 'Hard Rock Stadium',     city: 'Miami Gardens, FL',   country: 'USA', capacity: 65326,  lat: 25.9580, lng: -80.2389, surface: 'Grass',    host: 'GS', image: '🏟️' },
  { id: 12, name: 'NRG Stadium',           city: 'Houston, TX',         country: 'USA', capacity: 72220,  lat: 29.6847, lng: -95.4108, surface: 'Grass',    host: 'GS', image: '🏟️' },
  { id: 13, name: 'Seattle Seahawks Stadium', city: 'Seattle, WA',      country: 'USA', capacity: 69000,  lat: 47.5952, lng: -122.3316, surface: 'FieldTurf', host: 'GS', image: '🏟️' },
  { id: 14, name: 'BMO Field',             city: 'Toronto',             country: 'CAN', capacity: 30000,  lat: 43.6330, lng: -79.4184, surface: 'Grass',    host: 'GS', image: '🏟️' },
  { id: 15, name: 'BC Place',              city: 'Vancouver',           country: 'CAN', capacity: 54500,  lat: 49.2767, lng: -123.1115, surface: 'FieldTurf', host: 'GS', image: '🏟️' },
  { id: 16, name: 'Estadio BBVA',          city: 'Monterrey',           country: 'MEX', capacity: 53500,  lat: 25.6694, lng: -100.2436, surface: 'Grass',   host: 'GS', image: '🏟️' },
];

// ── MATCHES ─────────────────────────────────────────────────
export const MATCHES = [
  // GROUP STAGE — selected highlight matches
  { id: 1,  home: 'MEX', away: 'USA', homeFlag: '🇲🇽', awayFlag: '🇺🇸', date: '2026-06-11', time: '20:00', venue: 'Estadio Azteca',   group: 'A', status: 'completed', score: '1-2', attendance: 87600 },
  { id: 2,  home: 'BRA', away: 'IRN', homeFlag: '🇧🇷', awayFlag: '🇮🇷', date: '2026-06-14', time: '16:00', venue: 'MetLife Stadium',   group: 'C', status: 'live',      score: '2-0', attendance: 82500 },
  { id: 3,  home: 'FRA', away: 'GER', homeFlag: '🇫🇷', awayFlag: '🇩🇪', date: '2026-06-14', time: '19:00', venue: 'SoFi Stadium',     group: 'E', status: 'upcoming',  score: '-',   attendance: 0 },
  { id: 4,  home: 'ARG', away: 'ESP', homeFlag: '🇦🇷', awayFlag: '🇪🇸', date: '2026-06-15', time: '20:00', venue: 'AT&T Stadium',     group: '-', status: 'upcoming',  score: '-',   attendance: 0 },
  { id: 5,  home: 'ENG', away: 'CAN', homeFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', awayFlag: '🇨🇦', date: '2026-06-16', time: '18:00', venue: 'Gillette Stadium', group: 'B', status: 'upcoming',  score: '-',   attendance: 0 },
  { id: 6,  home: 'POR', away: 'MAR', homeFlag: '🇵🇹', awayFlag: '🇲🇦', date: '2026-06-17', time: '21:00', venue: 'Hard Rock Stadium',group: 'F', status: 'upcoming',  score: '-',   attendance: 0 },
  { id: 7,  home: 'USA', away: 'ESP', homeFlag: '🇺🇸', awayFlag: '🇪🇸', date: '2026-07-03', time: '19:00', venue: 'Levi\'s Stadium',  group: 'QF', status: 'upcoming', score: '-',   attendance: 0 },
  { id: 8,  home: 'BRA', away: 'ARG', homeFlag: '🇧🇷', awayFlag: '🇦🇷', date: '2026-07-09', time: '18:00', venue: 'MetLife Stadium',  group: 'SF', status: 'upcoming', score: '-',   attendance: 0 },
];

// ── GROUP STANDINGS ─────────────────────────────────────────
export const GROUP_STANDINGS = {
  A: [
    { pos: 1, team: 'Spain',       flag: '🇪🇸', p: 3, w: 2, d: 1, l: 0, gf: 5, ga: 2, pts: 7 },
    { pos: 2, team: 'USA',         flag: '🇺🇸', p: 3, w: 2, d: 0, l: 1, gf: 4, ga: 3, pts: 6 },
    { pos: 3, team: 'Netherlands', flag: '🇳🇱', p: 3, w: 1, d: 1, l: 1, gf: 3, ga: 3, pts: 4 },
    { pos: 4, team: 'Mexico',      flag: '🇲🇽', p: 3, w: 0, d: 0, l: 3, gf: 2, ga: 6, pts: 0 },
  ],
  C: [
    { pos: 1, team: 'Brazil',      flag: '🇧🇷', p: 2, w: 2, d: 0, l: 0, gf: 6, ga: 1, pts: 6 },
    { pos: 2, team: 'Argentina',   flag: '🇦🇷', p: 2, w: 1, d: 1, l: 0, gf: 3, ga: 2, pts: 4 },
    { pos: 3, team: 'Iran',        flag: '🇮🇷', p: 2, w: 0, d: 1, l: 1, gf: 2, ga: 4, pts: 1 },
    { pos: 4, team: 'Colombia',    flag: '🇨🇴', p: 2, w: 0, d: 0, l: 2, gf: 0, ga: 4, pts: 0 },
  ],
};

// ── PARKING ZONES ───────────────────────────────────────────
export const PARKING_ZONES = [
  { id: 'P1', name: 'Zone P-A1 (VIP)',    total: 200, lat: 40.8140, lng: -74.0760, price: 85, type: 'vip' },
  { id: 'P2', name: 'Zone P-A2 (North)',  total: 500, lat: 40.8150, lng: -74.0755, price: 45, type: 'standard' },
  { id: 'P3', name: 'Zone P-B1 (South)',  total: 600, lat: 40.8130, lng: -74.0740, price: 40, type: 'standard' },
  { id: 'P4', name: 'Zone P-B2 (East)',   total: 400, lat: 40.8145, lng: -74.0730, price: 40, type: 'standard' },
  { id: 'P5', name: 'Zone P-C1 (Remote)',  total: 800, lat: 40.8100, lng: -74.0780, price: 25, type: 'remote' },
  { id: 'P6', name: 'Zone P-D1 (ADA)',    total: 100, lat: 40.8135, lng: -74.0748, price: 0,  type: 'ada' },
];

// ── TRANSPORT ───────────────────────────────────────────────
export const TRANSPORT_ROUTES = [
  { id: 'M1', type: 'metro',  name: 'NJ Transit Line 1', from: 'Penn Station', to: 'MetLife', duration: 22, frequency: 8,  status: 'running', capacity: 85 },
  { id: 'M2', type: 'metro',  name: 'NJ Transit Line 2', from: 'Hoboken',     to: 'MetLife', duration: 30, frequency: 10, status: 'running', capacity: 72 },
  { id: 'B1', type: 'bus',    name: 'Express Bus A',     from: 'Times Sq',   to: 'MetLife', duration: 45, frequency: 15, status: 'running', capacity: 60 },
  { id: 'B2', type: 'bus',    name: 'Fan Shuttle B',     from: 'Newark',     to: 'MetLife', duration: 20, frequency: 12, status: 'delayed', capacity: 90 },
  { id: 'S1', type: 'shuttle',name: 'VIP Shuttle',       from: 'Marriott',   to: 'VIP Gate',duration: 15, frequency: 5,  status: 'running', capacity: 45 },
  { id: 'S2', type: 'shuttle',name: 'Park & Ride',       from: 'Zone P-C1',  to: 'Main Gate',duration:10, frequency: 8,  status: 'running', capacity: 78 },
];

// ── VOLUNTEER TASKS ─────────────────────────────────────────
export const VOLUNTEER_TASKS = [
  { id: 1,  name: 'Gate Assistance',    area: 'Gate 1-VIP',   shift: '14:00-22:00', volunteers: 12, required: 15, priority: 'high' },
  { id: 2,  name: 'Fan Information',    area: 'Main Concourse',shift:'12:00-20:00', volunteers: 8,  required: 10, priority: 'medium' },
  { id: 3,  name: 'Medical Support',    area: 'First Aid Post',shift:'10:00-23:00', volunteers: 5,  required: 5,  priority: 'critical' },
  { id: 4,  name: 'Parking Direction',  area: 'Zone P-A2',    shift: '13:00-19:00', volunteers: 18, required: 20, priority: 'high' },
  { id: 5,  name: 'Accessibility Aid',  area: 'All Zones',    shift: '10:00-22:00', volunteers: 7,  required: 8,  priority: 'high' },
  { id: 6,  name: 'Lost & Found',       area: 'Gate 3-North', shift: '15:00-22:00', volunteers: 3,  required: 4,  priority: 'medium' },
  { id: 7,  name: 'Media Escort',       area: 'Press Box',    shift: '11:00-21:00', volunteers: 4,  required: 4,  priority: 'low' },
  { id: 8,  name: 'Emergency Response', area: 'Sector F',     shift: '14:00-23:00', volunteers: 6,  required: 8,  priority: 'critical' },
];

// ── CROWD SECTIONS ──────────────────────────────────────────
export const STADIUM_SECTIONS = [
  { id: 'A1', name: 'North Lower',    capacity: 12500, density: 94, status: 'critical' },
  { id: 'A2', name: 'North Upper',    capacity: 8200,  density: 78, status: 'high' },
  { id: 'B1', name: 'South Lower',    capacity: 12500, density: 82, status: 'high' },
  { id: 'B2', name: 'South Upper',    capacity: 8200,  density: 55, status: 'medium' },
  { id: 'C1', name: 'East Lower',     capacity: 10000, density: 71, status: 'high' },
  { id: 'C2', name: 'East Upper',     capacity: 7000,  density: 45, status: 'medium' },
  { id: 'D1', name: 'West Lower',     capacity: 10000, density: 88, status: 'high' },
  { id: 'D2', name: 'West Upper',     capacity: 7000,  density: 32, status: 'low' },
  { id: 'E1', name: 'VIP East',       capacity: 2000,  density: 62, status: 'medium' },
  { id: 'E2', name: 'VIP West',       capacity: 2000,  density: 58, status: 'medium' },
  { id: 'F1', name: 'Media Section',  capacity: 600,   density: 40, status: 'low' },
  { id: 'F2', name: 'Family Zone',    capacity: 3000,  density: 68, status: 'medium' },
];

// ── SUSTAINABILITY METRICS ───────────────────────────────────
export const ECO_METRICS = {
  carbonSaved: 1240,         // tonnes CO2
  renewableEnergy: 78,       // %
  waterRecycled: 65,         // %
  wasteRecycled: 82,         // %
  solarPanels: 15000,        // panels
  electricVehicles: 342,     // EVs in use
  treesPlanted: 5000,
  plasticBottlesAvoided: 850000,
  greenCertification: 'FIFA Green Stadium Level 3',
};

// ── AI QUICK REPLIES ─────────────────────────────────────────
export const AI_QUICK_REPLIES = [
  'Where can I park near MetLife Stadium?',
  'What time does the next Brazil match start?',
  'How do I get from Penn Station to the stadium?',
  'Which gate is least crowded right now?',
  'Tell me about the sustainability initiatives',
  'Where is the nearest medical station?',
  'I need help for wheelchair access',
  'What fan zones are available tonight?',
];

// ── EMERGENCY INCIDENTS ──────────────────────────────────────
export const INCIDENT_TYPES = [
  { id: 'MEDICAL',  label: 'Medical Emergency', icon: '🏥', color: '#FF3D57', severity: 'critical' },
  { id: 'SECURITY', label: 'Security Threat',   icon: '🛡️', color: '#FF3D57', severity: 'critical' },
  { id: 'FIRE',     label: 'Fire / Evacuation', icon: '🔥', color: '#FF6B35', severity: 'critical' },
  { id: 'CROWD',    label: 'Crowd Crush',        icon: '👥', color: '#FFB300', severity: 'high' },
  { id: 'LOST',     label: 'Lost Person',        icon: '🔍', color: '#FFB300', severity: 'medium' },
  { id: 'TECH',     label: 'Technical Failure',  icon: '⚙️', color: '#0066FF', severity: 'low' },
];

// ── STATUS COLORS ────────────────────────────────────────────
export const STATUS_COLORS = {
  low:      { bg: 'rgba(0,200,83,0.15)',  border: 'rgba(0,200,83,0.4)',  text: '#00C853' },
  medium:   { bg: 'rgba(255,179,0,0.15)', border: 'rgba(255,179,0,0.4)', text: '#FFB300' },
  high:     { bg: 'rgba(255,107,53,0.15)',border: 'rgba(255,107,53,0.4)',text: '#FF6B35' },
  critical: { bg: 'rgba(255,61,87,0.15)', border: 'rgba(255,61,87,0.4)', text: '#FF3D57' },
  open:     { bg: 'rgba(0,200,83,0.15)',  border: 'rgba(0,200,83,0.4)',  text: '#00C853' },
  busy:     { bg: 'rgba(255,179,0,0.15)', border: 'rgba(255,179,0,0.4)', text: '#FFB300' },
  closed:   { bg: 'rgba(255,61,87,0.15)', border: 'rgba(255,61,87,0.4)', text: '#FF3D57' },
  live:     { bg: 'rgba(255,61,87,0.15)', border: 'rgba(255,61,87,0.4)', text: '#FF3D57' },
  upcoming: { bg: 'rgba(0,102,255,0.12)', border: 'rgba(0,102,255,0.3)', text: '#0066FF' },
  completed:{ bg: 'rgba(255,255,255,0.06)',border:'rgba(255,255,255,0.15)',text:'#8899aa' },
};

// ── LANGUAGES ────────────────────────────────────────────────
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English',    flag: '🇺🇸' },
  { code: 'es', name: 'Español',    flag: '🇪🇸' },
  { code: 'fr', name: 'Français',   flag: '🇫🇷' },
  { code: 'pt', name: 'Português',  flag: '🇧🇷' },
  { code: 'de', name: 'Deutsch',    flag: '🇩🇪' },
  { code: 'ar', name: 'العربية',    flag: '🇸🇦' },
  { code: 'ja', name: '日本語',      flag: '🇯🇵' },
  { code: 'zh', name: '中文',        flag: '🇨🇳' },
];
