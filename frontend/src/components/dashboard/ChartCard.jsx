import React from 'react';
import { motion } from 'framer-motion';

/**
 * ChartCard — wrapper for all chart sections
 */
export default function ChartCard({ title, subtitle, action, children, style = {}, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-card"
      style={{ padding: '1.5rem', ...style }}
    >
      {(title || action) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            {title && <h3 className="heading-md">{title}</h3>}
            {subtitle && <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </motion.div>
  );
}
