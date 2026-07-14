import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Users, Activity, AlertTriangle, TrendingUp, BarChart2,
  Zap, Globe, Car, Train, Leaf, Eye, Settings, Download
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const REVENUE_DATA = [
  { day: 'Mon', tickets: 4200, merch: 1800, food: 2400 },
  { day: 'Tue', tickets: 3800, merch: 2100, food: 2800 },
  { day: 'Wed', tickets: 5100, merch: 1600, food: 3200 },
  { day: 'Thu', tickets: 6200, merch: 2400, food: 3800 },
  { day: 'Fri', tickets: 8400, merch: 3100, food: 4200 },
  { day: 'Sat', tickets: 9600, merch: 3800, food: 5100 },
  { day: 'Sun', tickets: 7800, merch: 2900, food: 4400 },
];

const AI_INSIGHTS = [
  { icon: '📈', title: 'Revenue Forecast', desc: 'Projected $2.8M revenue today — 14% above target. VIP merch driving growth.', color: '#00C853' },
  { icon: '⚡', title: 'Capacity Optimization', desc: 'Opening Gate 13 at 18:15 will reduce Gate 5 queue by 62% and improve fan ratings.', color: '#0066FF' },
  { icon: '🌡️', title: 'Sustainability Alert', desc: 'Energy usage 8% above target. Recommend reducing Level 4 HVAC by 15%.', color: '#FFB300' },
  { icon: '🤖', title: 'AI Chat Peak', desc: '14,200 AI interactions today. Peak at 15:30. Top query: "Where is my seat?" (2,840 times).', color: '#00D4FF' },
];

const SYSTEM_STATUS = [
  { name: 'AI Stadium Copilot', status: 'online', uptime: '99.9%', load: 78 },
  { name: 'Crowd Intelligence', status: 'online', uptime: '100%', load: 91 },
  { name: 'Navigation Engine', status: 'online', uptime: '99.7%', load: 45 },
  { name: 'Parking System', status: 'online', uptime: '100%', load: 62 },
  { name: 'Emergency Response', status: 'online', uptime: '100%', load: 34 },
  { name: 'Translation API', status: 'degraded', uptime: '98.2%', load: 88 },
];

const STADIUMS = [
  { name: 'MetLife Stadium', city: 'New York/NJ', capacity: 82500, crowd: 91, status: 'live' },
  { name: 'SoFi Stadium', city: 'Los Angeles', capacity: 70240, crowd: 74, status: 'upcoming' },
  { name: 'AT&T Stadium', city: 'Dallas', capacity: 80000, crowd: 68, status: 'upcoming' },
  { name: "Levi's Stadium", city: 'San Francisco', capacity: 68500, crowd: 55, status: 'open' },
];

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState('overview');

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{ padding: '0.3rem 0.85rem', background: 'rgba(255,61,87,0.15)', border: '1px solid rgba(255,61,87,0.35)', borderRadius: 999, fontSize: '0.7rem', fontWeight: 700, color: '#FF3D57' }}>
              🔴 ADMIN ACCESS ONLY
            </div>
          </div>
          <p className="section-label">⚙️ FIFA Command Center</p>
          <h1 className="heading-xl">Admin Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.35rem' }}>Real-time platform control · AI insights · 16 stadiums · 48 nations</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" style={{ fontSize: '0.85rem', gap: '0.4rem' }}>
            <Download size={14} /> Export Report
          </button>
          <button className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
            <Settings size={14} /> Control Panel
          </button>
        </div>
      </div>

      {/* View Tabs */}
      <div className="tabs-scroll" style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--bg-glass-border)', paddingBottom: '0.5rem' }}>
        {[['overview','Overview'],['stadiums','Stadiums'],['ai','AI Analytics'],['system','System']].map(([k, l]) => (
          <button key={k} onClick={() => setActiveView(k)}
            style={{ padding: '0.6rem 1.25rem', borderRadius: '10px 10px 0 0', border: 'none', cursor: 'pointer', fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.875rem', transition: 'all 0.2s', whiteSpace: 'nowrap',
              background: activeView === k ? 'rgba(0,102,255,0.15)' : 'transparent',
              color: activeView === k ? 'var(--color-accent)' : 'var(--text-muted)',
              borderBottom: activeView === k ? '2px solid var(--color-accent)' : '2px solid transparent'
            }}>
            {l}
          </button>
        ))}
      </div>

      {activeView === 'overview' && (
        <>
          {/* Platform KPIs */}
          <div className="grid-responsive-4" style={{ marginBottom: '2rem' }}>
            {[
              { label: 'Total Fans Today', value: '347,820', change: '+14%', icon: Users, color: '#0066FF' },
              { label: 'AI Interactions', value: '142,400', change: '+23%', icon: Activity, color: '#00D4FF' },
              { label: 'Active Incidents', value: '8', change: '-40%', icon: AlertTriangle, color: '#FF3D57' },
              { label: 'Revenue Today', value: '$2.84M', change: '+14%', icon: TrendingUp, color: '#00C853' },
            ].map(kpi => (
              <div key={kpi.label} className="stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500, marginBottom: '0.5rem' }}>{kpi.label}</div>
                    <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '1.75rem', color: 'var(--text-primary)', lineHeight: 1 }}>{kpi.value}</div>
                    <div style={{ fontSize: '0.75rem', color: '#00C853', fontWeight: 700, marginTop: '0.35rem' }}>{kpi.change} vs yesterday</div>
                  </div>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${kpi.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <kpi.icon size={20} color={kpi.color} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Revenue Chart + AI Insights */}
          <div className="grid-2col" style={{ marginBottom: '2rem' }}>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 className="heading-md" style={{ marginBottom: '1.25rem' }}>Revenue Breakdown ($K)</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={REVENUE_DATA} barSize={10}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--bg-glass-border)', borderRadius: 12, color: 'var(--text-primary)', fontSize: 12 }} />
                  <Bar dataKey="tickets" fill="#0066FF" name="Tickets" radius={[4,4,0,0]} />
                  <Bar dataKey="merch" fill="#7850ff" name="Merchandise" radius={[4,4,0,0]} />
                  <Bar dataKey="food" fill="#00C853" name="Food & Bev" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <Zap size={18} color="#00D4FF" />
                <h3 className="heading-md" style={{ margin: 0 }}>AI Command Insights</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {AI_INSIGHTS.map(insight => (
                  <div key={insight.title} style={{ padding: '0.85rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{insight.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: insight.color, marginBottom: '0.25rem' }}>{insight.title}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{insight.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {activeView === 'stadiums' && (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 className="heading-md" style={{ marginBottom: '1.25rem' }}>FIFA World Cup 2026 — Stadium Command</h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr><th>Stadium</th><th>City</th><th>Capacity</th><th>Current Fill</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {STADIUMS.map(s => (
                  <tr key={s.name}>
                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{s.name}</td>
                    <td>{s.city}</td>
                    <td>{s.capacity.toLocaleString()}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div className="progress-bar" style={{ flex: 1, minWidth: 80 }}>
                          <div className="progress-fill" style={{ width: `${s.crowd}%`, background: s.crowd > 85 ? '#FF3D57' : s.crowd > 70 ? '#FFB300' : '#00C853' }} />
                        </div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{s.crowd}%</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-${s.status === 'live' ? 'danger' : s.status === 'upcoming' ? 'warning' : 'success'}`}>
                        {s.status === 'live' && <span className="pulse-dot red" style={{ marginRight: 3 }} />}
                        {s.status.toUpperCase()}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button style={{ padding: '0.3rem 0.65rem', borderRadius: 6, border: '1px solid rgba(0,212,255,0.25)', background: 'rgba(0,212,255,0.08)', color: 'var(--color-accent)', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Poppins' }}>View</button>
                        <button style={{ padding: '0.3rem 0.65rem', borderRadius: 6, border: '1px solid rgba(255,179,0,0.25)', background: 'rgba(255,179,0,0.08)', color: '#FFB300', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Poppins' }}>Manage</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeView === 'system' && (
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 className="heading-md" style={{ marginBottom: '1.25rem' }}>System Health Monitor</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {SYSTEM_STATUS.map(sys => (
              <div key={sys.name} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 180 }}>
                  <span className={`pulse-dot ${sys.status === 'online' ? 'green' : 'yellow'}`} />
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{sys.name}</span>
                </div>
                <span className={`badge badge-${sys.status === 'online' ? 'success' : 'warning'}`}>{sys.status.toUpperCase()}</span>
                <div style={{ textAlign: 'center', minWidth: 60 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#00C853' }}>{sys.uptime}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Uptime</div>
                </div>
                <div style={{ flex: 1, minWidth: 120 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                    <span>CPU Load</span><span>{sys.load}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${sys.load}%`, background: sys.load > 85 ? '#FF3D57' : sys.load > 70 ? '#FFB300' : '#00C853' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeView === 'ai' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 className="heading-md" style={{ marginBottom: '1.25rem' }}>AI Query Distribution</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { topic: 'Navigation & Seating', count: 2840, pct: 20 },
                { topic: 'Food & Beverages', count: 2100, pct: 15 },
                { topic: 'Transport', count: 1980, pct: 14 },
                { topic: 'Parking', count: 1750, pct: 12 },
                { topic: 'Match Schedule', count: 1540, pct: 11 },
                { topic: 'Emergency', count: 840, pct: 6 },
                { topic: 'Other', count: 3150, pct: 22 },
              ].map(q => (
                <div key={q.topic}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.35rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{q.topic}</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{q.count.toLocaleString()}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${q.pct * 4}%`, background: 'linear-gradient(90deg,#0066FF,#00D4FF)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 className="heading-md" style={{ marginBottom: '1.25rem' }}>Language Distribution</h3>
            {[
              { lang: '🇺🇸 English', pct: 38, color: '#0066FF' },
              { lang: '🇪🇸 Spanish', pct: 22, color: '#00C853' },
              { lang: '🇧🇷 Portuguese', pct: 14, color: '#FFB300' },
              { lang: '🇫🇷 French', pct: 10, color: '#7850ff' },
              { lang: '🇩🇪 German', pct: 6, color: '#00D4FF' },
              { lang: '🇸🇦 Arabic', pct: 5, color: '#FF3D57' },
              { lang: 'Others', pct: 5, color: '#ff6b35' },
            ].map(l => (
              <div key={l.lang} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', minWidth: 120 }}>{l.lang}</span>
                <div className="progress-bar" style={{ flex: 1 }}>
                  <div className="progress-fill" style={{ width: `${l.pct * 2.5}%`, background: l.color }} />
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: l.color, minWidth: 30 }}>{l.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
