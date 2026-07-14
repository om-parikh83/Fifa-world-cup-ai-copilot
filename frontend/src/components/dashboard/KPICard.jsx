import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { useCountUp } from '../../hooks/useRealTimeData';

/**
 * KPICard — animated stat card used across all dashboards
 */
export default function KPICard({
  icon: Icon,
  title,
  value,
  rawValue,
  unit = '',
  change,
  positive = true,
  color = '#0066FF',
  subtitle,
  index = 0,
  onClick,
  badge,
}) {
  // Animate count up for numeric values
  const numericTarget = typeof rawValue === 'number' ? rawValue : 0;
  const animated = useCountUp(numericTarget, 1400, true);

  const displayValue = rawValue !== undefined
    ? (rawValue >= 1000 ? animated.toLocaleString() : animated)
    : value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="stat-card"
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      {/* Top bar accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity: 0.7,
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            {title}
          </div>
          <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '2rem', color: 'var(--text-primary)', lineHeight: 1, display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
            {displayValue}
            {unit && <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontWeight: 500 }}>{unit}</span>}
          </div>

          {change !== undefined && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.5rem', fontSize: '0.72rem', color: positive ? '#00C853' : '#FF3D57', fontWeight: 600 }}>
              {positive ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
              {Math.abs(change)}% from last hour
            </div>
          )}

          {subtitle && (
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              {subtitle}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
          <div style={{
            width: 46, height: 46, borderRadius: 12,
            background: `${color}20`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `1px solid ${color}30`,
            flexShrink: 0,
          }}>
            <Icon size={22} color={color} />
          </div>
          {badge && (
            <span style={{
              fontSize: '0.6rem', fontWeight: 700, padding: '0.15rem 0.5rem',
              borderRadius: 999, background: `${color}20`, color, border: `1px solid ${color}40`,
            }}>
              {badge}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
