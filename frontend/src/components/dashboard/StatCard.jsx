import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ label, value, icon, change, changeType = 'positive', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="stat-card"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>
            {label}
          </span>
          <h3 style={{ fontFamily: 'Montserrat', fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.1 }}>
            {value}
          </h3>
        </div>
        <div style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(0,102,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
          {icon}
        </div>
      </div>
      {change && (
        <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 600 }}>
          <span style={{ color: changeType === 'positive' ? 'var(--color-success)' : 'var(--color-danger)' }}>
            {changeType === 'positive' ? '↑' : '↓'} {change}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>vs match avg</span>
        </div>
      )}
    </motion.div>
  );
}
