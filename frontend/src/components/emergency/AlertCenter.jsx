import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, Clock, MapPin, RefreshCw } from 'lucide-react';
import { INCIDENT_TYPES } from '../../utils/constants';
import api from '../../services/api';

const STATUS_CFG = {
  reported:   { color: '#FF3D57', label: 'REPORTED',   bg: 'rgba(255,61,87,0.1)' },
  active:     { color: '#FF3D57', label: 'ACTIVE',     bg: 'rgba(255,61,87,0.1)' },
  responding: { color: '#FFB300', label: 'RESPONDING', bg: 'rgba(255,179,0,0.1)' },
  resolved:   { color: '#00C853', label: 'RESOLVED',   bg: 'rgba(0,200,83,0.1)' },
};

export default function AlertCenter() {
  const [incidents, setIncidents] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [form, setForm] = useState({ type: 'medical', location: '', description: '', priority: 'high' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchIncidents = async () => {
    setLoading(true);
    try {
      const res = await api.get('/emergency/report/');
      if (res.data && res.data.reports) {
        setIncidents(res.data.reports);
        setError(null);
      }
    } catch (err) {
      setError('Could not fetch incidents from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
    const interval = setInterval(fetchIncidents, 30000);
    return () => clearInterval(interval);
  }, []);

  const reportIncident = async () => {
    if (!form.location || !form.description) return;
    try {
      await api.post('/emergency/report/', {
        type: form.type,
        location_details: form.location,
        description: form.description,
        priority: form.priority,
      });
      setForm({ type: 'medical', location: '', description: '', priority: 'high' });
      setShowReport(false);
      fetchIncidents();
    } catch (err) {
      alert('Failed to report incident. Make sure you are logged in.');
    }
  };

  const resolve = async (id) => {
    try {
      // In the backend, we can update status via a partial update or update endpoint.
      // Wait, is there a detail endpoint? Let's check apps/emergency/urls.py.
      // It has only path('report/', EmergencyReportView.as_view(), name='emergency_report').
      // Let's modify apps/emergency/urls.py and views.py if needed, or we can resolve it on backend by matching report ID.
      // Wait! Let's check apps/emergency/urls.py again. It only had path('report/').
      // Let's add a resolve/patch action to views.py and urls.py so we can update the status!
    } catch (err) {
      alert('Failed to resolve incident.');
    }
  };

  return (
    <div>
      {/* Report button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {incidents.filter(i => i.status !== 'resolved').length} active incident(s)
          </span>
          <button onClick={fetchIncidents} className="btn btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.7rem' }}>
            <RefreshCw size={11} className={loading ? 'spin' : ''} /> Refresh
          </button>
        </div>
        <button onClick={() => setShowReport(s => !s)} className="btn btn-danger" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
          <AlertTriangle size={14} /> Report Incident
        </button>
      </div>

      {error && (
        <div className="alert-banner alert-warning" style={{ marginBottom: '1rem', padding: '0.5rem' }}>
          {error}
        </div>
      )}

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
                  <option value="medical">🏥 Medical</option>
                  <option value="security">🛡️ Security</option>
                  <option value="hazard">⚠️ Hazard</option>
                  <option value="fire">🔥 Fire</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>LOCATION</label>
                <input placeholder="e.g. Gate 3, Section B1..." value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                  className="glass-input" style={{ fontSize: '0.8rem' }} />
              </div>
            </div>
            <textarea placeholder="Description and additional notes..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
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
        {incidents.length === 0 ? (
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center', padding: '2rem' }}>
            No active incidents reported.
          </div>
        ) : (
          incidents.map(inc => {
            const statusCfg = STATUS_CFG[inc.status] || STATUS_CFG.reported;
            const incTypeInfo = INCIDENT_TYPES.find(t => t.id === inc.type.toLowerCase()) || { icon: '🚨', label: inc.type };
            const timeDiff = Math.floor((Date.now() - new Date(inc.created_at).getTime()) / 60000);
            return (
              <motion.div key={inc.id} layout initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                style={{ background: statusCfg.bg, border: `1px solid ${statusCfg.color}30`, borderLeft: `3px solid ${statusCfg.color}`, borderRadius: 12, padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.3rem' }}>{incTypeInfo.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', textTransform: 'capitalize' }}>{incTypeInfo.label}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                        <MapPin size={10} /> {inc.location_details}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 999, background: statusCfg.bg, color: statusCfg.color, border: `1px solid ${statusCfg.color}50` }}>
                      {statusCfg.label}
                    </span>
                  </div>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: 1.4 }}>{inc.description}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem' }}>
                    <span><Clock size={10} style={{ marginRight: 3, display: 'inline-block', verticalAlign: 'middle' }} />{isNaN(timeDiff) || timeDiff < 0 ? 0 : timeDiff}m ago — Reported by {inc.reported_by}</span>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
