import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { VOLUNTEER_TASKS } from '../../utils/constants';
import { Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const PRIORITY_CFG = {
  critical: { color: '#FF3D57', bg: 'rgba(255,61,87,0.1)' },
  high:     { color: '#FF6B35', bg: 'rgba(255,107,53,0.1)' },
  medium:   { color: '#FFB300', bg: 'rgba(255,179,0,0.1)' },
  low:      { color: '#00C853', bg: 'rgba(0,200,83,0.1)' },
};

export default function VolunteerSchedule({ compact = false }) {
  const [tasks, setTasks] = useState(VOLUNTEER_TASKS);
  const [filter, setFilter] = useState('all');

  const checkin = (id) => {
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, volunteers: Math.min(t.volunteers + 1, t.required) } : t
    ));
  };

  const filtered = filter === 'all' ? tasks : tasks.filter(t => t.priority === filter);

  return (
    <div>
      {!compact && (
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {filtered.map((task, i) => {
          const pct = Math.round((task.volunteers / task.required) * 100);
          const cfg = PRIORITY_CFG[task.priority];
          const needs = task.volunteers < task.required;
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
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span>📍 {task.area}</span>
                    <span><Clock size={10} style={{ marginRight: 3 }} />{task.shift}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 700, color: needs ? cfg.color : '#00C853' }}>
                    <Users size={14} />
                    {task.volunteers}/{task.required}
                  </div>
                  {needs && (
                    <button onClick={() => checkin(task.id)} style={{ marginTop: '0.3rem', fontSize: '0.65rem', padding: '0.2rem 0.6rem', background: cfg.bg, border: `1px solid ${cfg.color}40`, borderRadius: 999, cursor: 'pointer', color: cfg.color, fontWeight: 600 }}>
                      + Check In
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
                  {pct >= 100 ? '✅ Fully staffed' : `${task.required - task.volunteers} more needed`}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
