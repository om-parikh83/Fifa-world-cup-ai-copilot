import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, Navigation as NavIcon, ChevronRight, MapPin, ArrowRight, AlertTriangle } from 'lucide-react';

const ROUTES = [
  { id: 1, label: 'Section 114-B (Seat 23)', dist: '4 min walk', via: 'Gate 5 → Blue Trail → Level 2', accessible: true, color: '#0066FF' },
  { id: 2, label: 'Food Court FC-3',           dist: '6 min walk', via: 'Gate 5 → Concourse A → East Wing', accessible: true, color: '#00C853' },
  { id: 3, label: 'Parking Zone P-B3',         dist: '8 min walk', via: 'Gate 7 → South Exit → Lot B', accessible: false, color: '#FFB300' },
  { id: 4, label: 'Fan Zone Alpha',            dist: '12 min walk',via: 'Gate 9 → Plaza Walk → North Zone', accessible: true, color: '#7850ff' },
];

const ZONES = [
  { id: 'vip',    label: 'VIP',         x: 42, y: 12, color: '#FFB300' },
  { id: 'media',  label: 'Media',       x: 55, y: 12, color: '#0066FF' },
  { id: 'g5',     label: 'Gate 5',      x: 50, y: 50, color: '#00D4FF' },
  { id: 'g1',     label: 'Gate 1 VIP',  x: 25, y: 30, color: '#FFB300' },
  { id: 'g9',     label: 'Gate 9',      x: 75, y: 30, color: '#00D4FF' },
  { id: 'fc3',    label: 'Food FC-3',   x: 35, y: 70, color: '#00C853' },
  { id: 'first',  label: 'First Aid',   x: 65, y: 70, color: '#FF3D57' },
  { id: 'park',   label: 'Parking P-B', x: 50, y: 90, color: '#7850ff' },
];

export default function Navigation() {
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState('walking');
  const [showAccessible, setShowAccessible] = useState(false);
  const [from, setFrom] = useState('My Location (Gate 5 Entry)');
  const [to, setTo] = useState('');

  return (
    <div className="page-wrapper">
      <div style={{ marginBottom: '1.5rem' }}>
        <p className="section-label">🗺️ Stadium Intelligence</p>
        <h1 className="heading-xl">Smart Navigation</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.35rem' }}>Real-time indoor navigation with AI-powered route optimization</p>
      </div>

      <div className="grid-sidebar-right">
        {/* Controls Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Route Planner */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 className="heading-md" style={{ marginBottom: '1.25rem' }}>Route Planner</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>FROM</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-accent)' }} />
                  <input value={from} onChange={e => setFrom(e.target.value)} className="glass-input" style={{ paddingLeft: '2.25rem', fontSize: '0.85rem' }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>TO</label>
                <div style={{ position: 'relative' }}>
                  <NavIcon size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#FF3D57' }} />
                  <input value={to} onChange={e => setTo(e.target.value)} placeholder="Search destination..." className="glass-input" style={{ paddingLeft: '2.25rem', fontSize: '0.85rem' }} />
                </div>
              </div>
            </div>

            {/* Mode toggle */}
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              {[['walking','🚶 Walk'],['accessible','♿ Accessible'],['emergency','🚨 Emergency']].map(([m, l]) => (
                <button key={m} onClick={() => setMode(m)}
                  style={{
                    flex: 1, padding: '0.5rem 0.25rem', borderRadius: 8, border: '1px solid', cursor: 'pointer', fontFamily: 'Poppins',
                    fontSize: '0.65rem', fontWeight: 600, transition: 'all 0.2s',
                    background: mode === m ? 'rgba(0,102,255,0.2)' : 'transparent',
                    borderColor: mode === m ? 'rgba(0,102,255,0.5)' : 'rgba(255,255,255,0.1)',
                    color: mode === m ? '#00D4FF' : 'var(--text-muted)'
                  }}>
                  {l}
                </button>
              ))}
            </div>

            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
              <NavIcon size={16} /> Get Directions
            </button>
          </div>

          {/* Suggested Routes */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 className="heading-md" style={{ marginBottom: '1rem' }}>Quick Destinations</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {ROUTES.map(route => (
                <button key={route.id} onClick={() => setSelected(route.id)}
                  style={{
                    padding: '0.85rem', borderRadius: 10, border: '1px solid', cursor: 'pointer', fontFamily: 'Poppins', textAlign: 'left',
                    background: selected === route.id ? `${route.color}18` : 'rgba(255,255,255,0.03)',
                    borderColor: selected === route.id ? `${route.color}60` : 'rgba(255,255,255,0.08)',
                    transition: 'all 0.2s'
                  }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{route.label}</span>
                    {route.accessible && <span style={{ fontSize: '0.7rem', color: '#00C853', fontWeight: 600 }}>♿</span>}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>📍 {route.via}</div>
                  <div style={{ fontSize: '0.7rem', color: route.color, fontWeight: 600, marginTop: '0.25rem' }}>🚶 {route.dist}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Accessibility Info */}
          <div className="glass-card" style={{ padding: '1.25rem', background: 'rgba(0,200,83,0.08)', borderColor: 'rgba(0,200,83,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem' }}>♿</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Accessibility Services</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Gates 2, 4, 8 · All elevators active</div>
              </div>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Hearing loop: Sections 120-135<br />
              Audio guide: Ask at Accessibility Desk<br />
              Sign Language: Sections A, B, C
            </div>
          </div>
        </div>

        {/* Stadium Map */}
        <div className="glass-card" style={{ padding: '1.5rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 className="heading-md">Interactive Stadium Map</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['L1', 'L2', 'L3', 'ALL'].map(l => (
                <button key={l} style={{ padding: '0.3rem 0.65rem', borderRadius: 6, border: '1px solid rgba(0,212,255,0.25)', background: 'rgba(0,212,255,0.08)', color: 'var(--color-accent)', fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'Poppins' }}>{l}</button>
              ))}
            </div>
          </div>

          {/* SVG Stadium Map */}
          <div style={{ background: 'rgba(6,13,26,0.8)', borderRadius: 20, overflow: 'hidden', position: 'relative', aspectRatio: '16/9' }}>
            <svg viewBox="0 0 100 60" style={{ width: '100%', height: '100%' }}>
              {/* Outer wall */}
              <ellipse cx="50" cy="30" rx="48" ry="28" fill="rgba(0,30,60,0.8)" stroke="rgba(0,212,255,0.2)" strokeWidth="0.5" />
              {/* Inner bowl */}
              <ellipse cx="50" cy="30" rx="35" ry="20" fill="rgba(0,20,50,0.9)" stroke="rgba(0,102,255,0.3)" strokeWidth="0.3" />
              {/* Pitch */}
              <ellipse cx="50" cy="30" rx="22" ry="13" fill="#1a4a1a" stroke="rgba(0,200,83,0.3)" strokeWidth="0.3" />
              <ellipse cx="50" cy="30" rx="22" ry="13" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.2" />
              {/* Center circle */}
              <circle cx="50" cy="30" r="4" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.2" />
              {/* Center spot */}
              <circle cx="50" cy="30" r="0.5" fill="rgba(255,255,255,0.3)" />
              {/* Halfway line */}
              <line x1="50" y1="17" x2="50" y2="43" stroke="rgba(255,255,255,0.08)" strokeWidth="0.2" />
              {/* Goal boxes */}
              <rect x="27" y="26" width="3" height="8" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.2" rx="0.5" />
              <rect x="70" y="26" width="3" height="8" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.2" rx="0.5" />

              {/* Seating sections (arcs) */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const x = 50 + 30 * Math.cos(rad);
                const y = 30 + 17 * Math.sin(rad);
                return <circle key={i} cx={x} cy={y} r="1.2" fill={i % 3 === 0 ? 'rgba(0,102,255,0.4)' : i % 3 === 1 ? 'rgba(0,212,255,0.25)' : 'rgba(0,30,80,0.6)'} />;
              })}

              {/* Zone markers */}
              {ZONES.map(zone => (
                <g key={zone.id} style={{ cursor: 'pointer' }}>
                  <circle cx={zone.x} cy={zone.y} r="2.5" fill={`${zone.color}30`} stroke={zone.color} strokeWidth="0.4" />
                  <circle cx={zone.x} cy={zone.y} r="1" fill={zone.color} />
                  <text x={zone.x} y={zone.y + 4.5} textAnchor="middle" fill="white" fontSize="2" fontFamily="Poppins" fontWeight="600">{zone.label}</text>
                </g>
              ))}

              {/* Your Location indicator */}
              <g>
                <circle cx="50" cy="50" r="2" fill="none" stroke="#00D4FF" strokeWidth="0.5">
                  <animate attributeName="r" values="2;4;2" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="50" cy="50" r="1.2" fill="#00D4FF" />
                <text x="50" y="55" textAnchor="middle" fill="#00D4FF" fontSize="2" fontFamily="Poppins" fontWeight="700">YOU</text>
              </g>

              {/* Route line (when selected) */}
              {selected && (
                <line x1="50" y1="50" x2="50" y2="12"
                  stroke="#0066FF" strokeWidth="0.6" strokeDasharray="1,1"
                  style={{ animation: 'none' }}>
                  <animate attributeName="stroke-dashoffset" values="0;-20" dur="1s" repeatCount="indefinite" />
                </line>
              )}
            </svg>

            {/* Legend */}
            <div style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {[['#0066FF','Gates'],['#00C853','Food'],['#FF3D57','Medical'],['#FFB300','VIP'],['#00D4FF','You']].map(([c, l]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(6,13,26,0.85)', padding: '0.2rem 0.5rem', borderRadius: 999, fontSize: '0.65rem', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: c, display: 'inline-block', flexShrink: 0 }} />{l}
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Routes */}
          <div style={{ marginTop: '1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem' }}>
            {[
              { icon: '🚨', label: 'Nearest Exit', val: 'Gate 7 — 2 min', color: '#FF3D57' },
              { icon: '🏥', label: 'Medical Station', val: 'Section 108', color: '#00C853' },
              { icon: '🛡️', label: 'Security Post', val: 'Gate 5 North', color: '#0066FF' },
            ].map(item => (
              <div key={item.label} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12 }}>
                <div style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>{item.icon}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>{item.label}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: item.color }}>{item.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
