import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Phone, Radio, CheckCircle, Clock, MapPin } from 'lucide-react';
import { INCIDENT_TYPES } from '../../utils/constants';

const MOCK_INCIDENTS = [
  { id: 1, type: 'MEDICAL', location: 'Section A1, Row 22', reporter: 'Security Team A', time: new Date(Date.now() - 240000), status: 'active', responders: 3, notes: 'Fan reported chest pain. Medical team en route.' },
  { id: 2, type: 'CROWD',   location: 'Gate 5 — South',     reporter: 'Gate Marshal 5',  time: new Date(Date.now() - 600000), status: 'responding', responders: 8, notes: 'Crowd surge detected. Barriers deployed.' },
  { id: 3, type: 'LOST',    location: 'Fan Zone North',     reporter: 'Volunteer Emma D', time: new Date(Date.now() - 1200000),status: 'resolved',   responders: 2, notes: 'Child reunited with family.' },
];

const STATUS_CFG = {
  active:     { color: '#FF3D57', label: 'ACTIVE',     bg: 'rgba(255,61,87,0.1)' },
  responding: { color: '#FFB300', label: 'RESPONDING', bg: 'rgba(255,179,0,0.1)' },
  resolved:   { color: '#00C853', label: 'RESOLVED',   bg: 'rgba(0,200,83,0.1)' },
};

export default function AlertCenter() {
  const [incidents, setIncidents] = useState(MOCK_INCIDENTS);
  const [showReport, setShowReport] = useState(false);
  const [form, setForm] = useState({ type: 'MEDICAL', location: '', notes: '' });

  const reportIncident = () => {
    if (!form.location) return;
    const newInc = {
      id: Date.now(),
      type: form.type,
      location: form.location,
      reporter: 'You (Self-Report)',
      time: new Date(),
      status: 'active',
      responders: 0,
      notes: form.notes,
    };
    setIncidents(prev => [newInc, ...prev]);
    setForm({ type: 'MEDICAL', location: '', notes: '' });
    setShowReport(false);
  };

  const resolve = (id) => {
    setIncidents(prev => prev.map(inc =>
      inc.id === id ? { ...inc, status: 'resolved' } : inc
    ));
  };

  const escalate = (id) => {
    setIncidents(prev => prev.map(inc =>
      inc.id === id ? { ...inc, status: 'responding', responders: inc.responders + 4 } : inc
    ));
  };

  return (
    <div>
      {/* Report button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {incidents.filter(i => i.status !== 'resolved').length} active incident(s)
          </span>
        </div>
        <button onClick={() => setShowReport(s => !s)} className="btn btn-danger" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
          <AlertTriangle size={14} /> Report Incident
        </button>
      </div>

      {/* Report form */}
      <AnimatePresence>
        {showReport && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(255,61,87,0.08)', border: '1px solid rgba(255,61,87,0.3)', borderRadius: 12, padding: '1rem', marginBottom: '1rem', overflow: 'hidden' }}>
            <h4 style={{ marginBottom: '0.75rem', fontSize: '0.875rem', color: '#FF3D57' }}>⚠️ Report Emergency Incident</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>INCIDENT TYPE</label>
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                  className="glass-input" style={{ fontSize: '0.8rem' }}>
                  {INCIDENT_TYPES.map(t => <option key={t.id} value={t.id}>{t.icon} {t.label}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>LOCATION</label>
                <input placeholder="e.g. Gate 3, Section B1..." value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                  className="glass-input" style={{ fontSize: '0.8rem' }} />
              </div>
            </div>
            <textarea placeholder="Additional notes..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
              className="glass-input" rows={2} style={{ fontSize: '0.8rem', resize: 'none', marginBottom: '0.75rem' }} />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={reportIncident} className="btn btn-danger" style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}>Submit Report</button>
              <button onClick={() => setShowReport(false)} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Cancel</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Incidents list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {incidents.map(inc => {
          const incType = INCIDENT_TYPES.find(t => t.id === inc.type);
          const statusCfg = STATUS_CFG[inc.status];
          const timeDiff = Math.floor((Date.now() - inc.time.getTime()) / 60000);
          return (
            <motion.div key={inc.id} layout initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              style={{ background: statusCfg.bg, border: `1px solid ${statusCfg.color}30`, borderLeft: `3px solid ${statusCfg.color}`, borderRadius: 12, padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>{incType?.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{incType?.label}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                      <MapPin size={10} /> {inc.location}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 999, background: statusCfg.bg, color: statusCfg.color, border: `1px solid ${statusCfg.color}50` }}>
                    {statusCfg.label}
                  </span>
                </div>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: 1.4 }}>{inc.notes}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem' }}>
                  <span><Clock size={10} style={{ marginRight: 3 }} />{timeDiff}m ago — {inc.reporter}</span>
                  {inc.responders > 0 && <span>👤 {inc.responders} responders</span>}
                </div>
                {inc.status !== 'resolved' && (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => escalate(inc.id)} style={{ fontSize: '0.7rem', padding: '0.25rem 0.75rem', background: 'rgba(255,179,0,0.15)', border: '1px solid rgba(255,179,0,0.4)', borderRadius: 999, cursor: 'pointer', color: '#FFB300', fontWeight: 600 }}>
                      Escalate
                    </button>
                    <button onClick={() => resolve(inc.id)} style={{ fontSize: '0.7rem', padding: '0.25rem 0.75rem', background: 'rgba(0,200,83,0.15)', border: '1px solid rgba(0,200,83,0.4)', borderRadius: 999, cursor: 'pointer', color: '#00C853', fontWeight: 600 }}>
                      Resolve
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
