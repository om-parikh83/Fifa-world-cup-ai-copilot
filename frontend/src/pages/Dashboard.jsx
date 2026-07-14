import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Activity, Users, Car, Train, AlertTriangle, Trophy,
  TrendingUp, ArrowUp, ArrowDown, Zap, Shield, Clock, RefreshCw
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../services/api';

const CROWD_DATA = [
  { time: '12:00', density: 28, parking: 45, transport: 120 },
  { time: '13:00', density: 42, parking: 62, transport: 185 },
  { time: '14:00', density: 58, parking: 71, transport: 240 },
  { time: '15:00', density: 74, parking: 88, transport: 310 },
  { time: '16:00', density: 91, parking: 95, transport: 420 },
  { time: '17:00', density: 78, parking: 82, transport: 380 },
  { time: '18:00', density: 65, parking: 70, transport: 290 },
  { time: '19:00', density: 55, parking: 60, transport: 250 },
];

const FALLBACK_GATE_STATUS = [
  { gate: 'Gate 1 — VIP', status: 'open', queue: 2 },
  { gate: 'Gate 3 — North', status: 'busy', queue: 18 },
  { gate: 'Gate 5 — South', status: 'critical', queue: 34 },
  { gate: 'Gate 7 — East', status: 'open', queue: 5 },
  { gate: 'Gate 9 — West', status: 'open', queue: 7 },
  { gate: 'Gate 11 — Media', status: 'busy', queue: 12 },
];

const FALLBACK_MATCH_DATA = [
  { home_team_detail: { flag: '🇧🇷', name: 'Brazil' }, away_team_detail: { flag: '🇦🇷', name: 'Argentina' }, kickoff_time: '16:00', venue_detail: { name: 'MetLife Stadium' }, stage: 'Group Stage', status: 'live', score_display: '2-1' },
];

const NATIONALITY_DATA = [
  { name: 'Brazil', value: 28, color: '#00C853' },
  { name: 'Argentina', value: 22, color: '#0066FF' },
  { name: 'USA', value: 18, color: '#FF3D57' },
  { name: 'Mexico', value: 12, color: '#FFB300' },
  { name: 'Other', value: 20, color: '#7850ff' },
];

const FALLBACK_ALERTS = [
  { type: 'danger',  msg: '🚨 Gate 5 — Critical congestion. Redirect fans to Gate 7.', time: '2 min ago' },
  { type: 'warning', msg: '⚠️ Parking Zone P-A2 reaching 90% capacity.', time: '5 min ago' },
  { type: 'info',    msg: '📣 Metro Line 2 — Extended service until 01:00 AM.', time: '8 min ago' },
];

const StatCard = ({ icon: Icon, title, value, change, unit = '', color, positive = true }) => (
  <div className="stat-card">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.5rem' }}>{title}</div>
        <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '2rem', color: 'var(--text-primary)', lineHeight: 1 }}>
          {value}<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>{unit}</span>
        </div>
        {change !== undefined && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.5rem', fontSize: '0.75rem', color: positive ? '#00C853' : '#FF3D57', fontWeight: 600 }}>
            {positive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
            {change}% from last hour
          </div>
        )}
      </div>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon size={20} color={color} />
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // API states
  const [attendance, setAttendance] = useState('68,420');
  const [parkingAvailable, setParkingAvailable] = useState('1,847');
  const [activeIncidents, setActiveIncidents] = useState('2');
  const [matches, setMatches] = useState(FALLBACK_MATCH_DATA);
  const [gates, setGates] = useState(FALLBACK_GATE_STATUS);
  const [alerts, setAlerts] = useState(FALLBACK_ALERTS);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Parking
      const parkingRes = await api.get('/parking/availability/');
      if (parkingRes.data) {
        const avail = parkingRes.data.total_available ?? parkingRes.data.zones?.reduce((s, z) => s + (z.total - z.occupied), 0);
        if (avail !== undefined) setParkingAvailable(avail.toLocaleString());
      }
    } catch (e) {}

    try {
      // 2. Fetch Crowd / Gate Status
      const crowdRes = await api.get('/crowd/analytics/');
      if (crowdRes.data) {
        const data = crowdRes.data;
        if (data.zones) {
          const mappedGates = data.zones.map(z => ({
            gate: z.zone,
            status: z.status === 'heavy' || z.density_pct > 80 ? 'critical'
                  : z.status === 'busy' || z.density_pct > 50 ? 'busy'
                  : 'open',
            queue: z.queue_wait_minutes
          }));
          setGates(mappedGates);
        }
        if (data.avg_density_pct) {
          // total attendance simulation
          const totalFans = Math.round(data.avg_density_pct * 820);
          setAttendance(totalFans.toLocaleString());
        }
      }
    } catch (e) {}

    try {
      // 3. Fetch Matches
      const matchesRes = await api.get('/stadium/matches/');
      if (matchesRes.data && matchesRes.data.length > 0) {
        setMatches(matchesRes.data);
      }
    } catch (e) {}

    try {
      // 4. Fetch Emergency / Active incidents
      const emergencyRes = await api.get('/emergency/report/');
      if (emergencyRes.data && emergencyRes.data.reports) {
        const active = emergencyRes.data.reports.filter(r => r.status !== 'resolved');
        setActiveIncidents(active.length.toString());

        const mappedAlerts = emergencyRes.data.reports.slice(0, 4).map(r => ({
          type: r.priority === 'high' || r.priority === 'critical' ? 'danger' : 'warning',
          msg: `${r.priority === 'high' || r.priority === 'critical' ? '🚨' : '⚠️'} ${r.type.toUpperCase()}: ${r.description} (${r.location_details})`,
          time: new Date(r.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }));
        if (mappedAlerts.length > 0) {
          setAlerts(mappedAlerts);
        }
      }
    } catch (e) {}

    setLoading(false);
    setLastUpdated(new Date());
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const liveMatch = matches.find(m => m.status === 'live') || matches[0];

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p className="section-label">⚽ FIFA World Cup 2026</p>
          <h1 className="heading-xl">
            Welcome back, <span className="text-gradient">{user?.name?.split(' ')[0] || 'Fan'}</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.35rem', fontSize: '0.9rem' }}>
            Live MetLife Stadium Dashboard · Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <button onClick={fetchDashboardData} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.85rem', fontSize: '0.75rem' }}>
            <RefreshCw size={12} className={loading ? 'spin' : ''} /> Refresh
          </button>
          <span className="badge badge-danger">
            <span className="pulse-dot red" style={{ marginRight: 2 }} /> {matches.filter(m => m.status === 'live').length} Live Match
          </span>
          <span className="badge badge-info">78% Capacity</span>
          <span className="badge badge-success">All Systems OK</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid-responsive-4" style={{ marginBottom: '2rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
          <StatCard icon={Users} title="Current Attendance" value={attendance} unit=" fans" change={12} color="#0066FF" positive={true} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <StatCard icon={Car} title="Parking Available" value={parkingAvailable} unit=" spots" change={8} color="#00C853" positive={false} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
          <StatCard icon={AlertTriangle} title="Active Incidents" value={activeIncidents} unit="" change={50} color="#FF3D57" positive={false} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
          <StatCard icon={Activity} title="AI Interactions" value="14,200" unit="" change={23} color="#FFB300" positive={true} />
        </motion.div>
      </div>

      {/* Live Match + Crowd Chart Row */}
      <div className="grid-2col" style={{ marginBottom: '2rem' }}>
        {/* Live Match */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 className="heading-md">{liveMatch?.status === 'live' ? 'Live Match' : 'Next Match'}</h3>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.2rem 0.65rem', background: liveMatch?.status === 'live' ? 'rgba(255,61,87,0.15)' : 'rgba(0,102,255,0.15)', border: liveMatch?.status === 'live' ? '1px solid rgba(255,61,87,0.4)' : '1px solid rgba(0,102,255,0.4)', borderRadius: 999, fontSize: '0.7rem', fontWeight: 700, color: liveMatch?.status === 'live' ? '#FF3D57' : '#0066FF' }}>
              <span className={`pulse-dot ${liveMatch?.status === 'live' ? 'red' : 'green'}`} /> {liveMatch?.status?.toUpperCase()}
            </span>
          </div>
          {liveMatch && (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: 600, letterSpacing: '0.08em', marginBottom: '1rem' }}>
                {liveMatch.group ? `Group ${liveMatch.group}` : liveMatch.stage} · {liveMatch.venue_detail?.name || 'MetLife Stadium'}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{liveMatch.home_team_detail?.flag || '⚽'}</div>
                  <div style={{ fontWeight: 700, fontSize: '1rem' }}>{liveMatch.home_team_detail?.name}</div>
                </div>
                <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: '3rem', color: 'var(--text-primary)', padding: '0.5rem 1.5rem', background: 'rgba(0,102,255,0.1)', borderRadius: 16 }}>
                  {liveMatch.score_display || '-'}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{liveMatch.away_team_detail?.flag || '⚽'}</div>
                  <div style={{ fontWeight: 700, fontSize: '1rem' }}>{liveMatch.away_team_detail?.name}</div>
                </div>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>⏱ Kickoff {liveMatch.kickoff_time} · {liveMatch.match_date}</div>
            </div>
          )}
        </div>

        {/* Crowd density chart */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 className="heading-md" style={{ marginBottom: '1.25rem' }}>Crowd Density Today</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={CROWD_DATA}>
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0066FF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0066FF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--bg-glass-border)', borderRadius: 12, color: 'var(--text-primary)', fontSize: 12 }} />
              <Area type="monotone" dataKey="density" stroke="#0066FF" strokeWidth={2} fill="url(#grad1)" name="Density" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gate Status + Nationality Pie + Alerts */}
      <div className="grid-sidebar-left" style={{ marginBottom: '2rem' }}>
        {/* Gate Status */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 className="heading-md">Gate Status</h3>
            <Link to="/crowd" style={{ fontSize: '0.8rem', color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 600 }}>View All →</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {gates.map(gate => (
              <div key={gate.gate} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
                <span className={`pulse-dot ${gate.status === 'open' ? 'green' : gate.status === 'busy' ? 'yellow' : 'red'}`} />
                <span style={{ flex: 1, fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>{gate.gate}</span>
                <div style={{ textAlign: 'right' }}>
                  <span className={`badge ${gate.status === 'open' ? 'badge-success' : gate.status === 'busy' ? 'badge-warning' : 'badge-danger'}`}>
                    {gate.status.toUpperCase()}
                  </span>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{gate.queue} min wait</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fan Nationality Pie */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 className="heading-md" style={{ marginBottom: '1.25rem' }}>Fan Nationalities</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={NATIONALITY_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {NATIONALITY_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--bg-glass-border)', borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
            {NATIONALITY_DATA.map(n => (
              <div key={n.name} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: n.color, display: 'inline-block' }} />
                {n.name} {n.value}%
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 className="heading-md">Recent Alerts</h3>
          <Link to="/emergency" style={{ fontSize: '0.8rem', color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 600 }}>Emergency Center →</Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {alerts.map((alert, i) => (
            <div key={i} className={`alert-banner alert-${alert.type}`}>
              <div style={{ flex: 1 }}>{alert.msg}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{alert.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
