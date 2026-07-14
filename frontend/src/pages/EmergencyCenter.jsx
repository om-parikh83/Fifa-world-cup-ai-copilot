import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Radio, Phone, Shield, Clock, MapPin, Siren } from 'lucide-react';
import KPICard from '../components/dashboard/KPICard';
import ChartCard from '../components/dashboard/ChartCard';
import AlertCenter from '../components/emergency/AlertCenter';
import { INCIDENT_TYPES } from '../utils/constants';

const EMERGENCY_CONTACTS = [
  { role: 'Stadium Security Command', name: 'Commander Davis', ext: '2911', status: 'available', radio: 'CH-1' },
  { role: 'Medical Director',         name: 'Dr. Patel',        ext: '2912', status: 'available', radio: 'CH-2' },
  { role: 'Fire Safety Officer',      name: 'Capt. Rodriguez',  ext: '2913', status: 'on-call',   radio: 'CH-3' },
  { role: 'Police Liaison',           name: 'Lt. Thompson',     ext: '2914', status: 'available', radio: 'CH-4' },
  { role: 'Fan Services Director',    name: 'Ms. Kim',          ext: '2915', status: 'available', radio: 'CH-5' },
];

const STATUS_COLORS = {
  available: '#00C853',
  'on-call':  '#FFB300',
  unavailable: '#FF3D57',
};

export default function EmergencyCenter() {
  const [activeIncidents] = useState(2);
  const [responseTime] = useState(3.2);
  const [staffDeployed] = useState(18);

  const kpis = [
    { icon: AlertTriangle, title: 'Active Incidents', value: activeIncidents.toString(), unit: '', color: '#FF3D57', index: 0, subtitle: '2 require immediate action' },
    { icon: Clock,         title: 'Avg Response Time', value: responseTime.toString(),  unit: ' min', color: '#FFB300', index: 1, change: 15, positive: true },
    { icon: Shield,        title: 'Staff Deployed',   value: staffDeployed.toString(),  unit: '',  color: '#0066FF', index: 2 },
    { icon: Radio,         title: 'Radio Channels',   value: '5',                       unit: ' active', color: '#00C853', index: 3 },
  ];

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p className="section-label" style={{ color: '#FF3D57' }}>🚨 Emergency Operations Center</p>
          <h1 className="heading-xl">Emergency <span style={{ color: '#FF3D57' }}>Center</span></h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.35rem', fontSize: '0.85rem' }}>
            MetLife Stadium · Match Day 14 · All channels monitored 24/7
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a href="tel:+18003472926" className="btn btn-danger">
            <Phone size={16} /> Emergency: 1-800-FIFA-911
          </a>
        </div>
      </div>

      {/* Severity legend */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {INCIDENT_TYPES.map(t => (
          <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.85rem', background: `${t.color}12`, border: `1px solid ${t.color}35`, borderRadius: 999, fontSize: '0.72rem', color: t.color, fontWeight: 600 }}>
            <span>{t.icon}</span> {t.label}
          </div>
        ))}
      </div>

      {/* KPIs */}
      <div className="grid-responsive-4" style={{ marginBottom: '1.5rem' }}>
        {kpis.map(k => <KPICard key={k.title} {...k} />)}
      </div>

      {/* Incidents + Contacts */}
      <div className="grid-sidebar-left" style={{ marginBottom: '1.5rem' }}>
        <ChartCard title="Active Incidents" subtitle="Report, escalate, or resolve incidents below" index={0}>
          <AlertCenter />
        </ChartCard>

        {/* Emergency contacts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <ChartCard title="Emergency Contacts" subtitle="Direct radio & phone lines" index={1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {EMERGENCY_CONTACTS.map((contact, i) => (
                <motion.div key={contact.ext} initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid var(--bg-glass-border)' }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: `${STATUS_COLORS[contact.status]}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className={`pulse-dot ${contact.status === 'available' ? 'green' : 'yellow'}`} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{contact.name}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{contact.role}</div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: STATUS_COLORS[contact.status] }}>{contact.status.toUpperCase()}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Ext. {contact.ext} · {contact.radio}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ChartCard>

          {/* Evacuation zones */}
          <ChartCard title="Evacuation Routes" index={2} style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.78rem' }}>
              {[
                { zone: 'Zone A (North)', exit: 'Gate 1, 3', status: 'clear', time: '3 min' },
                { zone: 'Zone B (South)', exit: 'Gate 5, 7', status: 'clear', time: '4 min' },
                { zone: 'Zone C (East)',  exit: 'Gate 9',    status: 'clear', time: '3.5 min' },
                { zone: 'Zone D (West)',  exit: 'Gate 11',   status: 'clear', time: '3 min' },
                { zone: 'VIP Section',   exit: 'Gate 1',    status: 'clear', time: '1.5 min' },
              ].map(route => (
                <div key={route.zone} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', background: 'rgba(0,200,83,0.05)', border: '1px solid rgba(0,200,83,0.15)', borderRadius: 8 }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{route.zone}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>via {route.exit}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#00C853', fontWeight: 700, fontSize: '0.7rem' }}>✅ {route.status.toUpperCase()}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{route.time} evac</div>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
