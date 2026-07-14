import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HandHeart, Users, CheckCircle, Clock, Award, Filter, UserPlus } from 'lucide-react';
import KPICard from '../components/dashboard/KPICard';
import ChartCard from '../components/dashboard/ChartCard';
import VolunteerSchedule from '../components/volunteer/VolunteerSchedule';
import { VOLUNTEER_TASKS } from '../utils/constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const VOLUNTEER_ROSTER = [
  { id: 1,  name: 'Emma Davis',    role: 'Gate Assistance', area: 'Gate 1-VIP',  status: 'on-duty', shift: '14:00-22:00', tasks: 8 },
  { id: 2,  name: 'Carlos Ruiz',   role: 'Fan Information', area: 'Concourse A',  status: 'on-duty', shift: '12:00-20:00', tasks: 12 },
  { id: 3,  name: 'Aisha Patel',   role: 'Medical Support', area: 'First Aid 1',  status: 'on-duty', shift: '10:00-23:00', tasks: 3 },
  { id: 4,  name: 'Jake Thompson', role: 'Parking Dir.',    area: 'Zone P-A2',   status: 'break',   shift: '13:00-19:00', tasks: 6 },
  { id: 5,  name: 'Sofia Chen',    role: 'Accessibility',   area: 'All Zones',    status: 'on-duty', shift: '10:00-22:00', tasks: 5 },
  { id: 6,  name: 'Marcus Lee',    role: 'Emergency Resp.', area: 'Sector F',    status: 'standby', shift: '14:00-23:00', tasks: 2 },
];

const DEPT_DATA = [
  { dept: 'Gate',       volunteers: 12, required: 15 },
  { dept: 'Fan Info',   volunteers: 8,  required: 10 },
  { dept: 'Medical',    volunteers: 5,  required: 5 },
  { dept: 'Parking',    volunteers: 18, required: 20 },
  { dept: 'Access',     volunteers: 7,  required: 8 },
  { dept: 'Emergency',  volunteers: 6,  required: 8 },
];

const STATUS_CFG = {
  'on-duty':  { color: '#00C853', label: 'ON DUTY' },
  'break':    { color: '#FFB300', label: 'ON BREAK' },
  'standby':  { color: '#0066FF', label: 'STANDBY' },
  'off':      { color: '#8899aa', label: 'OFF DUTY' },
};

export default function VolunteerDashboard() {
  const [roster, setRoster] = useState(VOLUNTEER_ROSTER);
  const [activeTab, setActiveTab] = useState('schedule');
  const [showEnroll, setShowEnroll] = useState(false);
  const [form, setForm] = useState({ name: '', role: 'Gate Assistance', shift: '14:00-22:00' });

  const totalVolunteers = roster.length;
  const onDuty = roster.filter(v => v.status === 'on-duty').length;
  const totalTasks = VOLUNTEER_TASKS.reduce((s, t) => s + t.volunteers, 0);
  const required   = VOLUNTEER_TASKS.reduce((s, t) => s + t.required, 0);

  const kpis = [
    { icon: Users,       title: 'Total Volunteers', rawValue: totalVolunteers, unit: '',   color: '#0066FF', index: 0 },
    { icon: CheckCircle, title: 'Currently On Duty', value: onDuty.toString(), unit: `/${totalVolunteers}`, color: '#00C853', index: 1 },
    { icon: HandHeart,   title: 'Tasks Filled',     value: totalTasks.toString(), unit: `/${required}`, color: '#FFB300', index: 2 },
    { icon: Award,       title: 'Avg Hours Served', value: '6.4',              unit: ' hrs', color: '#7850ff', index: 3 },
  ];

  const enroll = () => {
    if (!form.name) return;
    setRoster(prev => [...prev, {
      id: Date.now(), name: form.name, role: form.role, area: 'TBD',
      status: 'standby', shift: form.shift, tasks: 0,
    }]);
    setForm({ name: '', role: 'Gate Assistance', shift: '14:00-22:00' });
    setShowEnroll(false);
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p className="section-label">🤝 Volunteer Coordination Center</p>
          <h1 className="heading-xl">Volunteer <span className="text-gradient">Hub</span></h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.35rem', fontSize: '0.85rem' }}>
            {totalVolunteers} volunteers across {VOLUNTEER_TASKS.length} task areas
          </p>
        </div>
        <button onClick={() => setShowEnroll(s => !s)} className="btn btn-primary">
          <UserPlus size={16} /> Enroll Volunteer
        </button>
      </div>

      {/* Enroll form */}
      {showEnroll && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', background: 'rgba(0,102,255,0.06)', border: '1px solid rgba(0,102,255,0.3)' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.85rem' }}>➕ New Volunteer Registration</h3>
          <div className="grid-cols-3" style={{ gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>FULL NAME</label>
              <input placeholder="Volunteer name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="glass-input" style={{ fontSize: '0.8rem' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>ROLE</label>
              <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="glass-input" style={{ fontSize: '0.8rem' }}>
                {VOLUNTEER_TASKS.map(t => <option key={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>SHIFT</label>
              <select value={form.shift} onChange={e => setForm(f => ({ ...f, shift: e.target.value }))} className="glass-input" style={{ fontSize: '0.8rem' }}>
                {['10:00-18:00', '12:00-20:00', '14:00-22:00', '16:00-00:00'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={enroll} className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}>Enroll</button>
            <button onClick={() => setShowEnroll(false)} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Cancel</button>
          </div>
        </motion.div>
      )}

      {/* KPIs */}
      <div className="grid-responsive-4" style={{ marginBottom: '1.5rem' }}>
        {kpis.map(k => <KPICard key={k.title} {...k} />)}
      </div>

      {/* Tabs */}
      <div className="tabs-scroll" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--bg-glass-border)', paddingBottom: '0.75rem' }}>
        {['schedule', 'roster', 'analytics'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '0.5rem 1.25rem', borderRadius: 999, fontSize: '0.8rem', fontWeight: 700, border: '1px solid', background: activeTab === tab ? 'rgba(0,102,255,0.15)' : 'transparent', borderColor: activeTab === tab ? 'rgba(0,102,255,0.4)' : 'transparent', color: activeTab === tab ? '#00D4FF' : 'var(--text-muted)', cursor: 'pointer', textTransform: 'capitalize' }}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'schedule' && (
        <ChartCard title="Task Schedule" subtitle="Priority-ordered volunteer assignments" index={0}>
          <VolunteerSchedule />
        </ChartCard>
      )}

      {activeTab === 'roster' && (
        <ChartCard title="Active Roster" index={0}>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th><th>Role</th><th>Area</th><th>Shift</th><th>Status</th><th>Tasks Done</th>
                </tr>
              </thead>
              <tbody>
                {roster.map((v, i) => {
                  const statusCfg = STATUS_CFG[v.status] || STATUS_CFG.off;
                  return (
                    <motion.tr key={v.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                      <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{v.name}</td>
                      <td>{v.role}</td>
                      <td style={{ fontSize: '0.8rem' }}>📍 {v.area}</td>
                      <td style={{ fontSize: '0.8rem' }}><Clock size={12} style={{ marginRight: 4 }} />{v.shift}</td>
                      <td>
                        <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 999, background: `${statusCfg.color}20`, color: statusCfg.color, border: `1px solid ${statusCfg.color}40` }}>
                          {statusCfg.label}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 700, color: 'var(--color-accent)' }}>{v.tasks}</td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </ChartCard>
      )}

      {activeTab === 'analytics' && (
        <ChartCard title="Department Staffing vs Required" index={0}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={DEPT_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="dept" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--bg-glass-border)', borderRadius: 12, color: 'var(--text-primary)', fontSize: 12 }} />
              <Bar dataKey="volunteers" name="Assigned" fill="#0066FF" radius={[4, 4, 0, 0]} />
              <Bar dataKey="required"  name="Required"  fill="rgba(255,255,255,0.1)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      )}
    </div>
  );
}
