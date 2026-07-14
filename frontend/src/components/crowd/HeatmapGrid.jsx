import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { STADIUM_SECTIONS } from '../../utils/constants';
import { getDensityColor, getDensityStatus } from '../../utils/helpers';

export default function HeatmapGrid({ onSectionClick }) {
  const [sections, setSections] = useState(STADIUM_SECTIONS);
  const [selected, setSelected] = useState(null);

  // Simulate real-time density changes
  useEffect(() => {
    const interval = setInterval(() => {
      setSections(prev => prev.map(s => {
        const delta = (Math.random() - 0.48) * 3;
        const newDensity = Math.min(100, Math.max(10, s.density + delta));
        return { ...s, density: Math.round(newDensity), status: getDensityStatus(newDensity) };
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = (section) => {
    setSelected(section.id === selected ? null : section.id);
    onSectionClick?.(section);
  };

  // Layout: 4×3 grid representing stadium sections
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
        {sections.map((section, i) => {
          const color = getDensityColor(section.density);
          const isSelected = selected === section.id;
          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => handleClick(section)}
              className="heatmap-cell"
              style={{
                padding: '0.75rem 0.5rem',
                background: `${color}25`,
                border: `1px solid ${isSelected ? color : color + '50'}`,
                boxShadow: isSelected ? `0 0 12px ${color}50` : 'none',
                cursor: 'pointer',
                borderRadius: 8,
                transform: isSelected ? 'scale(1.04)' : undefined,
              }}
            >
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color, textAlign: 'center', marginBottom: '0.3rem' }}>
                {section.id}
              </div>
              <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '0.4rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {section.name}
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color, textAlign: 'center', fontFamily: 'Montserrat' }}>
                {section.density}%
              </div>
              {/* Mini progress bar */}
              <div style={{ height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 999, marginTop: '0.4rem', overflow: 'hidden' }}>
                <motion.div
                  animate={{ width: `${section.density}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  style={{ height: '100%', background: color, borderRadius: 999 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {[
          { label: 'Low (<50%)',      color: '#00C853' },
          { label: 'Medium (50-75%)', color: '#FFB300' },
          { label: 'High (75-90%)',   color: '#FF6B35' },
          { label: 'Critical (>90%)', color: '#FF3D57' },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: l.color, display: 'inline-block' }} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}
