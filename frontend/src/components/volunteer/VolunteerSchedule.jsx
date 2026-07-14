import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { getPriorityColor } from '../../utils/helpers';
import api from '../../services/api';

const PRIORITY_CFG = {
  critical: { color: '#FF3D57', bg: 'rgba(255,61,87,0.1)' },
  high:     { color: '#FF6B35', bg: 'rgba(255,107,53,0.1)' },
  medium:   { color: '#FFB300', bg: 'rgba(255,179,0,0.1)' },
  low:      { color: '#00C853', bg: 'rgba(0,200,83,0.1)' },
};

export default function VolunteerSchedule({ compact = false }) {
  const [tasks, setTasks] = useState([]);
  const [userAssignments, setUserAssignments] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasksAndAssignments = async () => {
    setLoading(true);
    try {
      const [tasksRes, assRes] = await Promise.all([
        api.get('/volunteers/tasks/'),
        api.get('/volunteers/assignments/')
      ]);

      const tasksData = tasksRes.data?.results || tasksRes.data || [];
      const assData = assRes.data?.results || assRes.data || [];

      // Compute current volunteer counts per task from actual assignments
      const computedTasks = tasksData.map(t => {
        const activeAssignedCount = assData.filter(a => a.task === t.id && a.status !== 'absent').length;
        return {
          ...t,
          volunteers: activeAssignedCount
        };
      });

      setTasks(computedTasks);
      setUserAssignments(assData);
      setError(null);
    } catch (err) {
      setError('Could not fetch schedule from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasksAndAssignments();
  }, []);

  const handleCheckIn = async (taskId) => {
    // Check if user already has an assignment for this task
    let assignment = userAssignments.find(a => a.task === taskId);

    try {
      if (!assignment) {
        // Create an assignment first if none exists
        const createRes = await api.post('/volunteers/assignments/', { task: taskId, status: 'assigned' });
        assignment = createRes.data;
      }

      // Perform check-in
      await api.post(`/volunteers/assignments/${assignment.id}/check-in/`);
      fetchTasksAndAssignments();
    } catch (err) {
      alert(err.response?.data?.message || 'Check-in failed. Please try again.');
    }
  };

  const filtered = filter === 'all' ? tasks : tasks.filter(t => t.priority === filter);

  if (loading && tasks.length === 0) {
    return <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Loading schedule...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        {!compact && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['all', 'critical', 'high', 'medium', 'low'].map(f => {
              const cfg = f !== 'all' ? PRIORITY_CFG[f] : null;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: '0.3rem 0.75rem', borderRadius: 999, fontSize: '0.7rem', fontWeight: 700,
                    border: '1px solid',
                    background: filter === f ? (cfg?.bg || 'rgba(0,102,255,0.1)') : 'transparent',
                    borderColor: filter === f ? (cfg?.color || 'rgba(0,102,255,0.4)') : 'var(--bg-glass-border)',
                    color: filter === f ? (cfg?.color || '#00D4FF') : 'var(--text-muted)',
                    cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>
                  {f}
                </button>
              );
            })}
          </div>
        )}
        <button onClick={fetchTasksAndAssignments} className="btn btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.7rem' }}>
          <RefreshCw size={11} className={loading ? 'spin' : ''} /> Refresh
        </button>
      </div>

      {error && (
        <div className="alert-banner alert-warning" style={{ marginBottom: '1rem', padding: '0.5rem' }}>
          {error}
        </div>
      )}

      {filtered.length === 0 ? (
        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center', padding: '2rem' }}>
          No tasks found matching this criteria.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {filtered.map((task, i) => {
            const volunteersCount = task.volunteers || 0;
            const requiredCount = task.volunteers_required || 1;
            const pct = Math.round((volunteersCount / requiredCount) * 100);
            const cfg = PRIORITY_CFG[task.priority] || PRIORITY_CFG.medium;
            const needs = volunteersCount < requiredCount;
            const isAssigned = userAssignments.some(a => a.task === task.id);
            const isCheckedIn = userAssignments.some(a => a.task === task.id && a.status === 'checked_in');

            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                style={{ background: 'var(--bg-glass)', border: '1px solid var(--bg-glass-border)', borderLeft: `3px solid ${cfg.color}`, borderRadius: 10, padding: '0.85rem 1rem' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {task.name}
                      <span style={{ fontSize: '0.6rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: 999, background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}40`, textTransform: 'uppercase' }}>
                        {task.priority}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                      {task.description}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.3rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <span>📍 {task.area}</span>
                      <span><Clock size={10} style={{ marginRight: 3 }} />{task.shift_start} - {task.shift_end}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700, color: needs ? cfg.color : '#00C853' }}>
                      <Users size={14} />
                      {volunteersCount}/{requiredCount}
                    </div>
                    {isCheckedIn ? (
                      <span style={{ marginTop: '0.3rem', display: 'inline-block', fontSize: '0.65rem', padding: '0.2rem 0.6rem', background: 'rgba(0, 200, 83, 0.1)', border: '1px solid rgba(0, 200, 83, 0.4)', borderRadius: 999, color: '#00C853', fontWeight: 600 }}>
                        Checked In
                      </span>
                    ) : (
                      <button onClick={() => handleCheckIn(task.id)} style={{ marginTop: '0.3rem', fontSize: '0.65rem', padding: '0.2rem 0.6rem', background: cfg.bg, border: `1px solid ${cfg.color}40`, borderRadius: 999, cursor: 'pointer', color: cfg.color, fontWeight: 600 }}>
                        {isAssigned ? 'Check In' : '+ Join & Check In'}
                      </button>
                    )}
                  </div>
                </div>
                {/* Progress */}
                <div style={{ marginTop: '0.6rem' }}>
                  <div className="progress-bar">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, pct)}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: i * 0.05 }}
                      style={{ background: pct >= 100 ? '#00C853' : cfg.color }}
                    />
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.2rem', textAlign: 'right' }}>
                    {pct >= 100 ? '✅ Fully staffed' : `${requiredCount - volunteersCount} more needed`}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
