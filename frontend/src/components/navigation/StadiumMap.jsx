import React, { useState } from 'react';
import { Shield, MapPin, Zap } from 'lucide-react';

export default function StadiumMap({ interactive = true, onSectorSelect }) {
  const [selectedSector, setSelectedSector] = useState(null);

  const sectors = [
    { id: 'sec-a', name: 'Sector A', path: 'M 100 100 A 120 120 0 0 1 200 50 L 220 80 A 90 90 0 0 0 130 120 Z', color: '#0066FF', gate: 'Gate A' },
    { id: 'sec-b', name: 'Sector B', path: 'M 200 50 A 120 120 0 0 1 300 100 L 270 120 A 90 90 0 0 0 220 80 Z', color: '#00D4FF', gate: 'Gate B' },
    { id: 'sec-c', name: 'Sector C', path: 'M 300 100 A 120 120 0 0 1 300 200 L 270 180 A 90 90 0 0 0 270 120 Z', color: '#7850ff', gate: 'Gate C' },
    { id: 'sec-d', name: 'Sector D', path: 'M 300 200 A 120 120 0 0 1 200 250 L 220 220 A 90 90 0 0 0 270 180 Z', color: '#00C853', gate: 'Gate D' },
    { id: 'sec-e', name: 'Sector E', path: 'M 200 250 A 120 120 0 0 1 100 200 L 130 180 A 90 90 0 0 0 220 220 Z', color: '#FFB300', gate: 'Gate E' },
    { id: 'sec-f', name: 'Sector F', path: 'M 100 200 A 120 120 0 0 1 100 100 L 130 120 A 90 90 0 0 0 130 180 Z', color: '#FF3D57', gate: 'Gate F' }
  ];

  const handleSelect = (sec) => {
    if (!interactive) return;
    setSelectedSector(sec.id);
    if (onSectorSelect) onSectorSelect(sec);
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h4 className="heading-md" style={{ alignSelf: 'flex-start', marginBottom: '1rem', fontSize: '0.95rem' }}>Interactive Stadium Blueprint</h4>
      <div style={{ position: 'relative', width: '100%', maxWidth: '320px', height: '300px', background: 'rgba(0,0,0,0.2)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%' }}>
          {/* Pitch */}
          <rect x="150" y="110" width="100" height="80" rx="4" fill="rgba(0,200,83,0.15)" stroke="var(--color-success)" strokeWidth="1.5" />
          <circle cx="200" cy="150" r="15" fill="none" stroke="var(--color-success)" strokeWidth="1" />
          <line x1="200" y1="110" x2="200" y2="190" stroke="var(--color-success)" strokeWidth="1" />

          {/* Stadium Sectors */}
          {sectors.map((sec) => (
            <path
              key={sec.id}
              d={sec.path}
              fill={selectedSector === sec.id ? sec.color : 'rgba(255,255,255,0.04)'}
              stroke="var(--bg-glass-border)"
              strokeWidth="1.5"
              style={{ cursor: interactive ? 'pointer' : 'default', transition: 'all 0.3s' }}
              onClick={() => handleSelect(sec)}
              onMouseEnter={(e) => {
                if (interactive && selectedSector !== sec.id) {
                  e.currentTarget.style.fill = 'rgba(255,255,255,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (interactive && selectedSector !== sec.id) {
                  e.currentTarget.style.fill = 'rgba(255,255,255,0.04)';
                }
              }}
            />
          ))}
        </svg>

        {/* Legend Overlay */}
        <div style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', gap: '0.5rem', background: 'var(--bg-card)', padding: '0.35rem 0.65rem', borderRadius: 8, fontSize: '0.65rem', border: '1px solid var(--bg-glass-border)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}><MapPin size={10} color="var(--color-accent)" /> Click Sector</span>
        </div>
      </div>

      {selectedSector && (
        <div style={{ marginTop: '1.25rem', width: '100%', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--bg-glass-border)', borderRadius: 12, fontSize: '0.8rem' }}>
          <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
            Selected: {sectors.find(s => s.id === selectedSector)?.name}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.72rem', marginTop: '0.2rem' }}>
            Recommended Entry: <span style={{ fontWeight: 600, color: 'var(--color-accent)' }}>{sectors.find(s => s.id === selectedSector)?.gate}</span>
          </div>
        </div>
      )}
    </div>
  );
}
