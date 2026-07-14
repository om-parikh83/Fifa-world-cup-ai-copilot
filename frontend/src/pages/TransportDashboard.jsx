import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Train, Bus, Clock, Users, ArrowRight, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import KPICard from '../components/dashboard/KPICard';
import ChartCard from '../components/dashboard/ChartCard';
import { TRANSPORT_ROUTES } from '../utils/constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import api from '../services/api';

const RIDER_DATA = [
  { time: '12:00', metro: 1200, bus: 450,  shuttle: 180 },
  { time: '13:00', metro: 2100, bus: 780,  shuttle: 310 },
  { time: '14:00', metro: 3500, bus: 1100, shuttle: 480 },
  { time: '15:00', metro: 5200, bus: 1600, shuttle: 720 },
  { time: '16:00', metro: 7800, bus: 2200, shuttle: 980 },
  { time: '17:00', metro: 9400, bus: 2800, shuttle: 1200 },
  { time: '18:00', metro: 8200, bus: 2400, shuttle: 1050 },
  { time: '19:00', metro: 6500, bus: 1900, shuttle: 820 },
];

const STATUS_CFG = {
  running: { color: '#00C853', label: 'RUNNING', icon: CheckCircle },
  active:  { color: '#00C853', label: 'RUNNING', icon: CheckCircle },
  delayed:  { color: '#FFB300', label: 'DELAYED', icon: AlertTriangle },
  suspended:{ color: '#FF3D57', label: 'SUSPENDED', icon: AlertTriangle },
};

const TYPE_ICONS = { metro: Train, bus: Bus, shuttle: Users, 'shuttle bus': Bus, walking: Users, 'light rail': Train };

export default function TransportDashboard() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [planFrom, setPlanFrom] = useState('');
  const [planTo, setPlanTo]   = useState('MetLife Stadium');
  const [showPlan, setShowPlan] = useState(false);

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const res = await api.get('/transport/schedule/');
      if (res.data && res.data.transit_options) {
        const mapped = res.data.transit_options.map((opt, i) => ({
          id: i,
          name: opt.line,
          type: opt.mode.toLowerCase(),
          from: opt.direction?.split(' → ')?.[0] || 'Origin',
          to: opt.direction?.split(' → ')?.[1] || 'Destination',
          duration: opt.interval_minutes * 2 || 15,
          frequency: opt.interval_minutes,
          status: opt.status,
          capacity: opt.status === 'delayed' ? 92 : 65,
        }));
        setRoutes(mapped);
      } else {
        setRoutes(TRANSPORT_ROUTES);
      }
    } catch {
      setRoutes(TRANSPORT_ROUTES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const kpis = [
    { icon: Train, title: 'Active Routes',   value: routes.filter(r => r.status === 'running' || r.status === 'active').length.toString(), unit: `/${routes.length}`, color: '#0066FF', index: 0 },
    { icon: Users, title: 'Riders Today',    rawValue: 47280, unit: '',    color: '#00C853', index: 1, change: 18, positive: true },
    { icon: Clock, title: 'Avg Delay',       value: '4.2',  unit: ' min', color: '#FFB300', index: 2 },
    { icon: Bus,   title: 'Capacity Used',   value: '76',   unit: '%',    color: '#7850ff', index: 3, change: 5, positive: true },
  ];

  const planJourney = () => {
    if (!planFrom) return;
    setShowPlan(true);
  };


  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p className="section-label">🚆 Live Transit Intelligence</p>
          <h1 className="heading-xl">Transport <span className="text-gradient">Hub</span></h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.35rem', fontSize: '0.85rem' }}>
            Real-time status for all transit routes to MetLife Stadium
          </p>
        </div>
        <button onClick={fetchRoutes} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', fontSize: '0.8rem' }}>
          <RefreshCw size={14} className={loading ? 'spin' : ''} /> Refresh
        </button>
      </div>

      {/* KPIs */}
      <div className="grid-responsive-4" style={{ marginBottom: '1.5rem' }}>
        {kpis.map(k => <KPICard key={k.title} {...k} />)}
      </div>

      {/* Route list + Journey Planner */}
      <div className="grid-sidebar-left" style={{ marginBottom: '1.5rem' }}>
        <ChartCard title="Live Route Status" subtitle="All routes to MetLife Stadium" index={0}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {routes.map((route, i) => {
              const Icon = TYPE_ICONS[route.type] || Train;
              const status = STATUS_CFG[route.status];
              const StatusIcon = status.icon;
              const isSelected = selected?.id === route.id;
              return (
                <motion.div
                  key={route.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelected(isSelected ? null : route)}
                  style={{
                    background: isSelected ? 'rgba(0,102,255,0.08)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isSelected ? 'rgba(0,102,255,0.3)' : 'var(--bg-glass-border)'}`,
                    borderRadius: 12, padding: '1rem', cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: route.type === 'metro' ? 'rgba(0,102,255,0.15)' : 'rgba(0,212,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={18} color={route.type === 'metro' ? '#0066FF' : '#00D4FF'} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {route.name}
                        <span style={{ fontSize: '0.6rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: 999, background: `${status.color}20`, color: status.color, border: `1px solid ${status.color}40` }}>
                          {status.label}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        <span>{route.from} <ArrowRight size={10} style={{ verticalAlign: 'middle' }} /> {route.to}</span>
                        <span><Clock size={10} style={{ marginRight: 3 }} />{route.duration} min</span>
                        <span>Every {route.frequency} min</span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: route.capacity > 80 ? '#FF3D57' : route.capacity > 60 ? '#FFB300' : '#00C853' }}>{route.capacity}%</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>capacity</div>
                    </div>
                  </div>
                  {isSelected && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--bg-glass-border)' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.5rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        <div><div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>Next Departure</div>In {Math.floor(Math.random() * 8) + 1} minutes</div>
                        <div><div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>Available Seats</div>{Math.floor((100 - route.capacity) * 3)} seats</div>
                        <div><div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>Stops</div>{route.type === 'metro' ? '3 stops' : 'Express'}</div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </ChartCard>

        {/* Journey Planner */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <ChartCard title="🗺️ Journey Planner" index={1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>FROM</label>
                <input
                  placeholder="Your location (e.g. Times Square)"
                  value={planFrom} onChange={e => setPlanFrom(e.target.value)}
                  className="glass-input" style={{ fontSize: '0.8rem' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>TO</label>
                <input value={planTo} readOnly className="glass-input" style={{ fontSize: '0.8rem', opacity: 0.7 }} />
              </div>
              <button onClick={planJourney} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <Train size={16} /> Find Best Route
              </button>
            </div>
            <AnimatePresence>
              {showPlan && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ marginTop: '1rem', padding: '0.85rem', background: 'rgba(0,200,83,0.08)', border: '1px solid rgba(0,200,83,0.3)', borderRadius: 10 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#00C853', marginBottom: '0.5rem' }}>✅ Best Route Found</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    🚂 <strong>NJ Transit Line 1</strong><br />
                    {planFrom || 'Your location'} → Penn Station → MetLife<br />
                    <strong>22 min</strong> · Departs in <strong>4 min</strong> · Running ✓
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </ChartCard>

          {/* Quick stats */}
          <ChartCard title="Service Advisory" index={2} style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem' }}>
              {[
                { type: 'success', msg: 'NJ Transit extended to 01:30 AM' },
                { type: 'warning', msg: 'Fan Shuttle B — 15 min delay' },
                { type: 'info',    msg: 'Free bus from NYC Fan Zone at 19:00' },
                { type: 'info',    msg: 'Bike share available at Gate 7' },
              ].map((a, i) => (
                <div key={i} className={`alert-banner alert-${a.type}`} style={{ padding: '0.5rem 0.75rem', fontSize: '0.72rem' }}>
                  {a.msg}
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Ridership chart */}
      <ChartCard title="Ridership Over Time" subtitle="Passengers per hour across all modes" index={3}>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={RIDER_DATA}>
            <defs>
              {['#0066FF', '#00D4FF', '#00C853'].map((color, i) => (
                <linearGradient key={i} id={`rGrad${i}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="time" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--bg-glass-border)', borderRadius: 12, color: 'var(--text-primary)', fontSize: 12 }} />
            <Area type="monotone" dataKey="metro"   name="Metro"   stroke="#0066FF" strokeWidth={2} fill="url(#rGrad0)" />
            <Area type="monotone" dataKey="bus"     name="Bus"     stroke="#00D4FF" strokeWidth={2} fill="url(#rGrad1)" />
            <Area type="monotone" dataKey="shuttle" name="Shuttle" stroke="#00C853" strokeWidth={2} fill="url(#rGrad2)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
