import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HandHeart, Users, CheckCircle, Clock, Award, Filter, UserPlus, RefreshCw, AlertTriangle } from 'lucide-react';
import KPICard from '../components/dashboard/KPICard';
import ChartCard from '../components/dashboard/ChartCard';
import VolunteerSchedule from '../components/volunteer/VolunteerSchedule';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../services/api';

const STATUS_CFG = {
  assigned:   { color: '#0066FF', label: 'ASSIGNED' },
  checked_in: { color: '#FFB300', label: 'CHECKED IN' },
  completed:  { color: '#00C853', label: 'COMPLETED' },
  absent:     { color: '#FF3D57', label: 'ABSENT' },
};

export default function VolunteerDashboard() {
  const [tasks, setTasks] = useState([]);
  const [roster, setRoster] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('schedule');
  const [showEnroll, setShowEnroll] = useState(false);
  const [form, setForm] = useState({ name: '', area: '', description: '', shift_start: '14:00:00', shift_end: '22:00:00', priority: 'medium' });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [tasksRes, rosterRes] = await Promise.all([
        api.get('/volunteers/tasks/'),
        api.get('/volunteers/assignments/')
      ]);

      const tasksData = tasksRes.data?.results || tasksRes.data || [];
      const rosterData = rosterRes.data?.results || rosterRes.data || [];

      setTasks(tasksData);
      setRoster(rosterData);
      setError(null);
    } catch (err) {
      setError('Could not fetch data from the server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalVolunteers = new Set(roster.map(r => r.volunteer)).size || 1;
  const onDuty = roster.filter(v => v.status === 'checked_in').length;
  const totalTasksCount = tasks.length;
  const required = tasks.reduce((s, t) => s + (t.volunteers_required || 1), 0);
  const filled = roster.filter(r => r.status !== 'absent').length;

  const kpis = [
    { icon: Users,       title: 'Total Volunteers', value: totalVolunteers.toString(), unit: '',   color: '#0066FF', index: 0 },
    { icon: CheckCircle, title: 'Currently On Duty', value: onDuty.toString(), unit: `/${totalVolunteers}`, color: '#00C853', index: 1 },
    { icon: HandHeart,   title: 'Tasks Filled',     value: filled.toString(), unit: `/${required}`, color: '#FFB300', index: 2 },
    { icon: Award,       title: 'Task Areas',       value: totalTasksCount.toString(), unit: '', color: '#7850ff', index: 3 },
  ];

  const handleCreateTask = async () => {
    if (!form.name || !form.area) return;
    try {
      await api.post('/volunteers/tasks/', {
        name: form.name,
        area: form.area,
        description: form.description,
        shift_start: form.shift_start,
        shift_end: form.shift_end,
        priority: form.priority,
        volunteers_required: 4
      });
      setForm({ name: '', area: '', description: '', shift_start: '14:00:00', shift_end: '22:00:00', priority: 'medium' });
      setShowEnroll(false);
      fetchData();
    } catch (err) {
      alert('Failed to create task. Only operators/staff can add tasks.');
    }
  };

  // Group by priority or area for department stats
  const areaGroupMap = {};
  tasks.forEach(t => {
    areaGroupMap[t.area] = (areaGroupMap[t.area] || 0) + t.volunteers_required;
  });
  const deptData = Object.entries(areaGroupMap).map(([area, req]) => {
    const assigned = roster.filter(r => r.task_detail?.area === area).length;
    return {
      dept: area.split(' ')[0],
      volunteers: assigned,
      required: req
    };
  });

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p className="section-label">🤝 Volunteer Coordination Center</p>
          <h1 className="heading-xl">Volunteer <span className="text-gradient">Hub</span></h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.35rem', fontSize: '0.85rem' }}>
            {totalVolunteers} volunteers across {totalTasksCount} task areas
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={fetchData} className="btn btn-secondary">
            <RefreshCw size={14} className={loading ? 'spin' : ''} /> Refresh
          </button>
          <button onClick={() => setShowEnroll(s => !s)} className="btn btn-primary">
            <UserPlus size={16} /> Add Task (Staff)
          </button>
        </div>
      </div>

      {error && (
        <div className="alert-banner alert-warning" style={{ marginBottom: '1rem' }}>
          <AlertTriangle size={14} style={{ marginRight: 6 }} /> {error}
        </div>
      )}

      {/* Enroll form */}
      {showEnroll && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', background: 'rgba(0,102,255,0.06)', border: '1px solid rgba(0,102,255,0.3)' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.85rem' }}>➕ Create Operations Task</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>TASK NAME</label>
              <input placeholder="e.g. Concourse Assistance" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="glass-input" style={{ fontSize: '0.8rem' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>LOCATION / AREA</label>
              <input placeholder="e.g. Gate 3" value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))} className="glass-input" style={{ fontSize: '0.8rem' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>PRIORITY</label>
              <select value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))} className="glass-input" style={{ fontSize: '0.8rem' }}>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>DESCRIPTION</label>
              <input placeholder="Task description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="glass-input" style={{ fontSize: '0.8rem' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={handleCreateTask} className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}>Create</button>
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
                  <th>Volunteer</th><th>Role / Task</th><th>Area</th><th>Shift Time</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {roster.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No assignments recorded yet.</td>
                  </tr>
                ) : (
                  roster.map((v, i) => {
                    const statusCfg = STATUS_CFG[v.status] || { color: '#8899aa', label: 'UNKNOWN' };
                    return (
                      <motion.tr key={v.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{v.volunteer_detail?.username || 'User'}</td>
                        <td>{v.task_detail?.name || 'Helper'}</td>
                        <td style={{ fontSize: '0.8rem' }}>📍 {v.task_detail?.area || 'Stadium'}</td>
                        <td style={{ fontSize: '0.8rem' }}>
                          <Clock size={12} style={{ marginRight: 4, display: 'inline-block', verticalAlign: 'middle' }} />
                          {v.task_detail?.shift_start} - {v.task_detail?.shift_end}
                        </td>
                        <td>
                          <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 999, background: `${statusCfg.color}20`, color: statusCfg.color, border: `1px solid ${statusCfg.color}40` }}>
                            {statusCfg.label}
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </ChartCard>
      )}

      {activeTab === 'analytics' && (
        <ChartCard title="Department Staffing vs Required" index={0}>
          {deptData.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No data available. Add some tasks first.</div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={deptData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="dept" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--bg-glass-border)', borderRadius: 12, color: 'var(--text-primary)', fontSize: 12 }} />
                <Bar dataKey="volunteers" name="Assigned" fill="#0066FF" radius={[4, 4, 0, 0]} />
                <Bar dataKey="required"  name="Required"  fill="rgba(255,255,255,0.1)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      )}
    </div>
  );
}
