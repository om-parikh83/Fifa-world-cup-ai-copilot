import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Check, X } from 'lucide-react';
import { generateParkingSpots } from '../../utils/helpers';

export default function ParkingGrid({ zone = 'P-A2', rows = 8, cols = 12, occupancyRate = 0.65 }) {
  const [spots, setSpots] = useState(() => generateParkingSpots(rows, cols, occupancyRate));
  const [selected, setSelected] = useState(null);
  const [booked, setBooked] = useState(null);

  const stats = useMemo(() => ({
    available: spots.filter(s => s.status === 'available').length,
    occupied:  spots.filter(s => s.status === 'occupied').length,
    reserved:  spots.filter(s => s.status === 'reserved').length,
    total:     spots.length,
  }), [spots]);

  const handleSpotClick = useCallback((spot) => {
    if (spot.status === 'occupied') return;
    setSelected(prev => prev?.id === spot.id ? null : spot);
  }, []);

  const handleBook = useCallback(() => {
    if (!selected) return;
    setSpots(prev => prev.map(s =>
      s.id === selected.id ? { ...s, status: 'reserved' } : s
    ));
    setBooked(selected);
    setSelected(null);
  }, [selected]);

  const spotStyle = (spot) => {
    if (spot.id === selected?.id) return 'parking-selected';
    if (spot.status === 'available') return 'parking-available';
    if (spot.status === 'reserved') return 'parking-reserved';
    return 'parking-occupied';
  };

  // Group by row label
  const rowLabels = Array.from({ length: rows }, (_, i) => String.fromCharCode(65 + i));

  return (
    <div>
      {/* Stats bar */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        {[
          { label: 'Available', value: stats.available, color: '#00C853' },
          { label: 'Reserved',  value: stats.reserved,  color: '#FFB300' },
          { label: 'Occupied',  value: stats.occupied,  color: '#FF3D57' },
        ].map(s => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: s.color, display: 'inline-block' }} />
            <strong style={{ color: s.color }}>{s.value}</strong> {s.label}
          </div>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {Math.round((stats.occupied / stats.total) * 100)}% occupied
        </div>
      </div>

      {/* Grid */}
      <div style={{ overflowX: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: `auto repeat(${cols}, 1fr)`, gap: '0.3rem', minWidth: cols * 52 }}>
          {/* Column headers */}
          <div />
          {Array.from({ length: cols }, (_, i) => (
            <div key={i} style={{ textAlign: 'center', fontSize: '0.55rem', color: 'var(--text-muted)', fontWeight: 700 }}>{i + 1}</div>
          ))}

          {/* Rows */}
          {rowLabels.map((rowLabel, rowIdx) => (
            <React.Fragment key={rowLabel}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', color: 'var(--text-muted)', fontWeight: 700, paddingRight: '0.3rem' }}>
                {rowLabel}
              </div>
              {spots.filter(s => s.row === rowIdx).map((spot) => (
                <motion.div
                  key={spot.id}
                  whileHover={spot.status !== 'occupied' ? { scale: 1.08 } : {}}
                  onClick={() => handleSpotClick(spot)}
                  className={`parking-spot ${spotStyle(spot)}`}
                  title={`Spot ${spot.id} — ${spot.status}`}
                  style={{ fontSize: '0.5rem', userSelect: 'none' }}
                >
                  {spot.status === 'available' && spot.id !== booked?.id ? '🅿' : ''}
                  {spot.id === booked?.id ? <Check size={8} /> : ''}
                </motion.div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Booking panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            style={{ marginTop: '1rem', background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.3)', borderRadius: 12, padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}
          >
            <Car size={20} color="#0066FF" />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Spot {selected.id} — Zone {zone}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{selected.status === 'reserved' ? 'Pre-bookable spot' : 'Walk-in available'}</div>
            </div>
            <button onClick={handleBook} className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}>
              Book Now
            </button>
            <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
              <X size={18} />
            </button>
          </motion.div>
        )}
        {booked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ marginTop: '0.5rem', background: 'rgba(0,200,83,0.1)', border: '1px solid rgba(0,200,83,0.3)', borderRadius: 12, padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#00C853' }}
          >
            <Check size={16} /> Spot <strong>{booked.id}</strong> successfully booked! Confirmation sent to your email.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
