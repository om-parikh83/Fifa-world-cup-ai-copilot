import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, MapPin, Clock, DollarSign, Filter } from 'lucide-react';
import ParkingGrid from '../components/parking/ParkingGrid';
import KPICard from '../components/dashboard/KPICard';
import ChartCard from '../components/dashboard/ChartCard';
import { PARKING_ZONES } from '../utils/constants';
import { getParkingStatusLabel } from '../utils/helpers';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ParkingDashboard() {
  const [selectedZone, setSelectedZone] = useState(PARKING_ZONES[1]);
  const [occupancyData] = useState([
    { zone: 'P-A1', occupancy: 92 },
    { zone: 'P-A2', occupancy: 89 },
    { zone: 'P-B1', occupancy: 65 },
    { zone: 'P-B2', occupancy: 54 },
    { zone: 'P-C1', occupancy: 22 },
    { zone: 'P-D1', occupancy: 68 },
  ]);

  const totalSpots = PARKING_ZONES.reduce((s, z) => s + z.total, 0);
  const avgOccupancy = Math.round(occupancyData.reduce((s, z) => s + z.occupancy, 0) / occupancyData.length);
  const availableZones = PARKING_ZONES.filter((_, i) => occupancyData[i]?.occupancy < 90).length;

  const kpis = [
    { icon: Car,        title: 'Total Spots',    rawValue: totalSpots,   unit: '',    color: '#0066FF', index: 0 },
    { icon: MapPin,     title: 'Open Zones',     value: `${availableZones}/6`,unit: '',color: '#00C853', index: 1 },
    { icon: Clock,      title: 'Avg Wait Time',  value: '8',             unit: ' min',color: '#FFB300', index: 2 },
    { icon: DollarSign, title: 'Revenue Today',  rawValue: 284600,       unit: '',    color: '#7850ff', index: 3, subtitle: 'USD — all zones' },
  ];

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p className="section-label">🅿️ Smart Parking Management</p>
        <h1 className="heading-xl">Parking <span className="text-gradient">Dashboard</span></h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.35rem', fontSize: '0.85rem' }}>
          MetLife Stadium — {totalSpots.toLocaleString()} total spots across 6 zones
        </p>
      </div>

      {/* KPIs */}
      <div className="grid-responsive-4" style={{ marginBottom: '1.5rem' }}>
        {kpis.map(k => <KPICard key={k.title} {...k} />)}
      </div>

      <div className="grid-sidebar-left" style={{ marginBottom: '1.5rem' }}>
        {/* Zone selector */}
        <ChartCard title="Zone Overview" subtitle="Select a zone to view its parking grid" index={0}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {PARKING_ZONES.map((zone, idx) => {
              const occ = occupancyData[idx]?.occupancy || 0;
              const { label, color } = getParkingStatusLabel(occ);
              const isSelected = selectedZone.id === zone.id;
              return (
                <motion.button
                  key={zone.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedZone(zone)}
                  style={{
                    background: isSelected ? 'rgba(0,102,255,0.12)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isSelected ? '#0066FF' : 'var(--bg-glass-border)'}`,
                    borderRadius: 12, padding: '1rem', cursor: 'pointer', textAlign: 'left',
                    boxShadow: isSelected ? '0 0 15px rgba(0,102,255,0.2)' : 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.8rem', color: isSelected ? 'var(--color-accent)' : 'var(--text-primary)', marginBottom: '0.3rem' }}>{zone.id}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{zone.name.split('(')[0]}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color }}>{occ}%</span>
                    <span style={{ fontSize: '0.6rem', padding: '0.15rem 0.5rem', borderRadius: 999, background: `${color}20`, color, border: `1px solid ${color}40`, fontWeight: 700 }}>{label}</span>
                  </div>
                  <div className="progress-bar" style={{ marginTop: '0.4rem', height: 4 }}>
                    <div className="progress-fill" style={{ width: `${occ}%`, background: color }} />
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>${zone.price}/hr · {zone.type}</div>
                </motion.button>
              );
            })}
          </div>
        </ChartCard>

        {/* Occupancy chart */}
        <ChartCard title="Zone Occupancy" subtitle="All zones at a glance" index={1}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={occupancyData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: 'var(--text-muted)', fontSize: 10 }} unit="%" axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="zone" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} width={40} />
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--bg-glass-border)', borderRadius: 10, color: 'var(--text-primary)', fontSize: 12 }} />
              <Bar dataKey="occupancy" name="Occupancy" fill="#0066FF" radius={[0, 4, 4, 0]}
                label={{ position: 'right', fill: 'var(--text-muted)', fontSize: 10, formatter: v => `${v}%` }}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Interactive parking grid */}
      <ChartCard
        title={`Spot Grid — ${selectedZone.name}`}
        subtitle={`Click an available spot to book · $${selectedZone.price}/hr · ${selectedZone.type.toUpperCase()}`}
        index={2}
      >
        <ParkingGrid
          zone={selectedZone.id}
          rows={8}
          cols={12}
          occupancyRate={occupancyData.find(o => o.zone === selectedZone.id)?.occupancy / 100 || 0.65}
        />
      </ChartCard>
    </div>
  );
}
