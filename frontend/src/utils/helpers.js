import { STATUS_COLORS } from './constants';

// ── Date & Time ──────────────────────────────────────────────
export function formatDate(dateStr, opts = {}) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: opts.weekday || 'short',
    month: opts.month || 'short',
    day: 'numeric',
    year: opts.year,
    ...opts,
  });
}

export function formatTime(timeStr) {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':');
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const h12 = hour % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

export function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ── Number Formatting ────────────────────────────────────────
export function formatNumber(n) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000)    return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export function formatPercent(n, decimals = 1) {
  return `${Number(n).toFixed(decimals)}%`;
}

export function formatCurrency(n, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(n);
}

// ── Status Helpers ───────────────────────────────────────────
export function getStatusStyle(status) {
  return STATUS_COLORS[status] || STATUS_COLORS.low;
}

export function getDensityStatus(density) {
  if (density >= 90) return 'critical';
  if (density >= 75) return 'high';
  if (density >= 50) return 'medium';
  return 'low';
}

export function getDensityColor(density) {
  if (density >= 90) return '#FF3D57';
  if (density >= 75) return '#FF6B35';
  if (density >= 50) return '#FFB300';
  return '#00C853';
}

export function getParkingStatusLabel(occupancy) {
  if (occupancy >= 95) return { label: 'Full', color: '#FF3D57' };
  if (occupancy >= 80) return { label: 'Almost Full', color: '#FFB300' };
  if (occupancy >= 50) return { label: 'Filling Up', color: '#FF6B35' };
  return { label: 'Available', color: '#00C853' };
}

// ── Match Helpers ────────────────────────────────────────────
export function getMatchStatusBadge(status) {
  switch (status) {
    case 'live':      return { label: 'LIVE', color: '#FF3D57', pulse: true };
    case 'upcoming':  return { label: 'UPCOMING', color: '#0066FF', pulse: false };
    case 'completed': return { label: 'FT', color: '#888', pulse: false };
    default:          return { label: status.toUpperCase(), color: '#888', pulse: false };
  }
}

// ── Crowd Simulation ─────────────────────────────────────────
export function generateCrowdTimeline(hours = 8, baseTime = '12:00') {
  const [baseH] = baseTime.split(':').map(Number);
  return Array.from({ length: hours }, (_, i) => {
    const h = baseH + i;
    const label = `${String(h).padStart(2, '0')}:00`;
    const density = Math.min(100, 20 + i * 10 + Math.random() * 8);
    return {
      time: label,
      density: Math.round(density),
      parking: Math.round(density * 0.9 + Math.random() * 5),
      transport: Math.round(density * 4 + Math.random() * 20),
    };
  });
}

// ── Parking Grid ─────────────────────────────────────────────
export function generateParkingSpots(rows = 8, cols = 12, occupancyRate = 0.65) {
  return Array.from({ length: rows * cols }, (_, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const rand = Math.random();
    let status;
    if (rand < occupancyRate * 0.85) status = 'occupied';
    else if (rand < occupancyRate * 0.95) status = 'reserved';
    else status = 'available';
    return {
      id: `${String.fromCharCode(65 + row)}${col + 1}`,
      row, col, status,
    };
  });
}

// ── Sustainability ───────────────────────────────────────────
export function getEcoGrade(score) {
  if (score >= 90) return { grade: 'A+', color: '#00C853' };
  if (score >= 80) return { grade: 'A',  color: '#00C853' };
  if (score >= 70) return { grade: 'B+', color: '#69D86F' };
  if (score >= 60) return { grade: 'B',  color: '#FFB300' };
  return { grade: 'C', color: '#FF6B35' };
}

// ── Misc ─────────────────────────────────────────────────────
export function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

export function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
