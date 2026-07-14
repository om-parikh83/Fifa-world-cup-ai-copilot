import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, AlertTriangle, Shield, TrendingUp, Eye, RefreshCw } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import HeatmapGrid from '../components/crowd/HeatmapGrid';
import AlertPanel from '../components/crowd/AlertPanel';
import KPICard from '../components/dashboard/KPICard';
import ChartCard from '../components/dashboard/ChartCard';
import { generateCrowdTimeline, getDensityColor } from '../utils/helpers';
import api from '../services/api';

const FALLBACK_GATE_STATUS = [
  { gate: 'Gate 1 — VIP',    status: 'open',     queue: 2,  flow: 340 },
  { gate: 'Gate 3 — North',  status: 'busy',     queue: 18, flow: 580 },
  { gate: 'Gate 5 — South',  status: 'critical', queue: 34, flow: 820 },
  { gate: 'Gate 7 — East',   status: 'open',     queue: 5,  flow: 410 },
  { gate: 'Gate 9 — West',   status: 'open',     queue: 7,  flow: 390 },
  { gate: 'Gate 11 — Media', status: 'busy',     queue: 12, flow: 200 },
];

export default function CrowdDashboard() {
  const [gateStatus, setGateStatus] = useState(FALLBACK_GATE_STATUS);
  const [timeline, setTimeline] = useState(() => generateCrowdTimeline(8));
  const [selectedSection, setSelectedSection] = useState(null);
  const [totalAttendance, setTotalAttendance] = useState(68420);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [apiError, setApiError] = useState(false);

  const refresh = async () => {
    setTimeline(generateCrowdTimeline(8));
    setLastUpdated(new Date());
    try {
      const res = await api.get('/crowd/analytics/');
      const data = res.data;
      if (data.zones && data.zones.length > 0) {
        const mapped = data.zones.map(z => ({
          gate: z.zone,
          status: z.status === 'heavy' || z.density_pct > 80 ? 'critical'
                : z.status === 'busy' || z.density_pct > 50 ? 'busy'
                : 'open',
          queue: z.queue_wait_minutes,
          flow: z.estimated_count,
        }));
        setGateStatus(mapped);
        setApiError(false);
      }
      // Simulate attendance from crowd data
      if (data.avg_density_pct) {
        setTotalAttendance(Math.round(data.avg_density_pct * 820));
      }
    } catch {
      setApiError(true);
    }
  };

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 30000);
    return () => clearInterval(interval);
  }, []);

  const kpis = [
    { icon: Users,         title: 'Total Attendance',   rawValue: totalAttendance, unit: ' fans', change: 12, positive: true,  color: '#0066FF', index: 0 },
    { icon: Activity,      title: 'Avg Section Density', value: '72%',             unit: '',      change: 5,  positive: true,  color: '#FFB300', index: 1 },
    { icon: AlertTriangle, title: 'Critical Zones',     value: '2',               unit: '',      change: 0,  positive: false, color: '#FF3D57', index: 2 },
    { icon: Shield,        title: 'Security Officers',  value: '284',             unit: '',      change: 8,  positive: true,  color: '#00C853', index: 3 },
  ];

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p className="section-label">📡 Real-Time Analytics</p>
          <h1 className="heading-xl">Crowd <span className="text-gradient">Intelligence</span></h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.35rem', fontSize: '0.85rem' }}>
            MetLife Stadium · Match Day 14 · Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <button onClick={refresh} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', fontSize: '0.8rem' }}>
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* KPIs */}
      <div className="grid-responsive-4" style={{ marginBottom: '1.5rem' }}>
        {kpis.map(k => <KPICard key={k.title} {...k} />)}
      </div>

      {/* Heatmap + Alerts */}
      <div className="grid-sidebar-left" style={{ marginBottom: '1.5rem' }}>
        <ChartCard title="Stadium Section Density" subtitle="Click any section for details · Updates every 4s" index={0}>
          <HeatmapGrid onSectionClick={setSelectedSection} />
          {selectedSection && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: '1rem', padding: '0.85rem', background: `${getDensityColor(selectedSection.density)}15`, border: `1px solid ${getDensityColor(selectedSection.density)}40`, borderRadius: 10 }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{selectedSection.name} ({selectedSection.id})</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
                Density: <strong style={{ color: getDensityColor(selectedSection.density) }}>{selectedSection.density}%</strong> ·
                Capacity: {selectedSection.capacity.toLocaleString()} ·
                Status: <strong style={{ textTransform: 'capitalize' }}>{selectedSection.status}</strong>
              </div>
            </motion.div>
          )}
        </ChartCard>

        <ChartCard title="Live Alerts" subtitle="Auto-refreshing · Click to resolve" index={1}>
          <AlertPanel maxItems={5} />
        </ChartCard>
      </div>

      {/* Crowd flow chart + Gate status */}
      <div className="grid-2col" style={{ marginBottom: '1.5rem' }}>
        <ChartCard title="Crowd Flow Over Time" subtitle="Density % across match day" index={2}>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={timeline}>
              <defs>
                <linearGradient id="crowdGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0066FF" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#0066FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--bg-glass-border)', borderRadius: 12, color: 'var(--text-primary)', fontSize: 12 }} />
              <Area type="monotone" dataKey="density" stroke="#0066FF" strokeWidth={2} fill="url(#crowdGrad)" name="Density" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Gate Status" index={3}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {gateStatus.map(gate => (
              <div key={gate.gate} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0.85rem', background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
                <span className={`pulse-dot ${gate.status === 'open' ? 'green' : gate.status === 'busy' ? 'yellow' : 'red'}`} />
                <span style={{ flex: 1, fontSize: '0.8rem', fontWeight: 500 }}>{gate.gate}</span>
                <div style={{ textAlign: 'right' }}>
                  <span className={`badge ${gate.status === 'open' ? 'badge-success' : gate.status === 'busy' ? 'badge-warning' : 'badge-danger'}`} style={{ fontSize: '0.6rem' }}>
                    {gate.status.toUpperCase()}
                  </span>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{gate.queue} min · {gate.flow}/hr</div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Fan flow bar chart */}
      <ChartCard title="Hourly Fan Arrivals" subtitle="Transport mode breakdown" index={4}>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={timeline}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="time" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--bg-glass-border)', borderRadius: 12, color: 'var(--text-primary)', fontSize: 12 }} />
            <Bar dataKey="transport" name="Transit Riders" fill="#0066FF" radius={[4, 4, 0, 0]} />
            <Bar dataKey="parking" name="Car/Parking" fill="#00D4FF" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
