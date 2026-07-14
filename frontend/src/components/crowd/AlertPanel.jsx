import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Bell, CheckCircle, XCircle, Clock, ChevronRight } from 'lucide-react';

const INITIAL_ALERTS = [
  { id: 1, type: 'critical', title: 'Gate 5 Overcrowding', msg: 'Crowd density at 94%. Immediate redirect to Gate 7 required.', time: new Date(Date.now() - 120000), section: 'A1', status: 'active' },
  { id: 2, type: 'warning',  title: 'Parking Zone P-A2 Near Full', msg: 'P-A2 at 89% capacity. Redirect to P-B1 or P-C1.', time: new Date(Date.now() - 300000), section: 'P-A2', status: 'active' },
  { id: 3, type: 'info',     title: 'Metro Line Extension', msg: 'NJ Transit extended to 01:30 AM after match end.', time: new Date(Date.now() - 480000), section: 'Transport', status: 'resolved' },
  { id: 4, type: 'success',  title: 'Emergency Drill Complete', msg: 'All emergency exits verified. Response time 3.2 min.', time: new Date(Date.now() - 900000), section: 'All Zones', status: 'resolved' },
];

const TYPE_CONFIG = {
  critical: { color: '#FF3D57', bg: 'rgba(255,61,87,0.1)',  border: 'rgba(255,61,87,0.3)',  icon: XCircle,       label: 'CRITICAL' },
  warning:  { color: '#FFB300', bg: 'rgba(255,179,0,0.1)', border: 'rgba(255,179,0,0.3)', icon: AlertTriangle, label: 'WARNING'  },
  info:     { color: '#00D4FF', bg: 'rgba(0,212,255,0.08)',border: 'rgba(0,212,255,0.25)',icon: Bell,          label: 'INFO'     },
  success:  { color: '#00C853', bg: 'rgba(0,200,83,0.1)',  border: 'rgba(0,200,83,0.3)',  icon: CheckCircle,  label: 'RESOLVED' },
};

function timeAgoShort(date) {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export default function AlertPanel({ maxItems = 6 }) {
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [filter, setFilter] = useState('all');

  // Simulate new alerts coming in
  useEffect(() => {
    const interval = setInterval(() => {
      const types = ['critical', 'warning', 'info'];
      const messages = [
        { type: 'warning', title: 'Concession Queue Growing', msg: 'Section B concession stand queue exceeds 8 minutes.', section: 'B1' },
        { type: 'info',    title: 'Fan Zone Opening', msg: 'North Fan Zone now open with live entertainment.', section: 'North Plaza' },
        { type: 'critical',title: 'Medical Assistance Required', msg: 'Fan reports dizziness near Gate 3. Medical team dispatched.', section: 'Gate 3' },
      ];
      const pick = messages[Math.floor(Math.random() * messages.length)];
      const newAlert = { id: Date.now(), ...pick, time: new Date(), status: 'active' };
      setAlerts(prev => [newAlert, ...prev].slice(0, 12));
    }, 18000);
    return () => clearInterval(interval);
  }, []);

  const dismiss = (id) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'resolved', type: 'success' } : a));
  };

  const filtered = filter === 'all' ? alerts : alerts.filter(a => a.type === filter || (filter === 'active' && a.status === 'active'));

  return (
    <div>
      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {['all', 'active', 'critical', 'warning', 'info'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '0.3rem 0.75rem', borderRadius: 999, fontSize: '0.7rem', fontWeight: 700,
              border: '1px solid',
              background: filter === f ? 'rgba(0,102,255,0.15)' : 'transparent',
              borderColor: filter === f ? 'rgba(0,102,255,0.4)' : 'var(--bg-glass-border)',
              color: filter === f ? '#00D4FF' : 'var(--text-muted)',
              cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em',
            }}
          >
            {f}
            {f === 'active' && (
              <span style={{ marginLeft: '0.4rem', background: '#FF3D57', color: 'white', borderRadius: 999, padding: '0 4px', fontSize: '0.6rem' }}>
                {alerts.filter(a => a.status === 'active').length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Alert list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: 400, overflowY: 'auto' }}>
        <AnimatePresence>
          {filtered.slice(0, maxItems).map((alert) => {
            const cfg = TYPE_CONFIG[alert.type];
            const Icon = cfg.icon;
            return (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: 10, padding: '0.85rem 1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}
              >
                <Icon size={16} color={cfg.color} style={{ flexShrink: 0, marginTop: 2 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: cfg.color }}>{alert.title}</span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', marginLeft: '0.5rem' }}>
                      {timeAgoShort(alert.time)}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{alert.msg}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.4rem' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>📍 {alert.section}</span>
                    {alert.status === 'active' && (
                      <button onClick={() => dismiss(alert.id)} style={{ fontSize: '0.65rem', color: '#00C853', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, padding: 0 }}>
                        ✓ Resolve
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
