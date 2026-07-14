import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Car, MapPin, Clock, DollarSign, RefreshCw, AlertTriangle } from 'lucide-react';
import ParkingGrid from '../components/parking/ParkingGrid';
import KPICard from '../components/dashboard/KPICard';
import ChartCard from '../components/dashboard/ChartCard';
import { getParkingStatusLabel } from '../utils/helpers';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../services/api';

// Fallback constants if API is unavailable
const FALLBACK_ZONES = [
  { zone: 'Zone P-A1',       capacity_total: 500, capacity_occupied: 482, capacity_reserved: 15, hourly_rate: '15.00', status: 'full'      },
  { zone: 'Zone P-A2',       capacity_total: 450, capacity_occupied: 400, capacity_reserved: 10, hourly_rate: '15.00', status: 'busy'      },
  { zone: 'Zone P-B1',       capacity_total: 400, capacity_occupied: 260, capacity_reserved: 8,  hourly_rate: '12.00', status: 'available' },
  { zone: 'Zone P-B2',       capacity_total: 400, capacity_occupied: 216, capacity_reserved: 5,  hourly_rate: '12.00', status: 'available' },
  { zone: 'Zone P-B3',       capacity_total: 300, capacity_occupied: 53,  capacity_reserved: 10, hourly_rate: '10.00', status: 'available' },
  { zone: 'Zone P-C1',       capacity_total: 200, capacity_occupied: 44,  capacity_reserved: 2,  hourly_rate: '8.00',  status: 'available' },
];

export default function ParkingDashboard() {
  const [zones, setZones]           = useState(FALLBACK_ZONES);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(2);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/parking/availability/');
      const data = res.data;
      if (data.zones && data.zones.length > 0) {
        setZones(data.zones);
        setError(null);
      }
    } catch (err) {
      setError('Live data unavailable — showing cached data');
    } finally {
      setLoading(false);
      setLastUpdated(new Date());
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, []);

  const selectedZone = zones[selectedIdx] || zones[0];

  const totalSpots    = zones.reduce((s, z) => s + (z.capacity_total || z.total || 0), 0);
  const totalOccupied = zones.reduce((s, z) => s + (z.capacity_occupied || z.occupied || 0), 0);
  const availableZones = zones.filter(z => z.status === 'available').length;
  const totalRevenue  = zones.reduce((s, z) => s + (z.capacity_occupied || z.occupied || 0) * parseFloat(z.hourly_rate || 0), 0);

  const chartData = zones.map(z => ({
    zone: (z.zone || '').replace('Zone ', '').split(' ')[0],
    occupancy: Math.round(((z.capacity_occupied || z.occupied || 0) / (z.capacity_total || z.total || 1)) * 100),
  }));

  const kpis = [
    { icon: Car,        title: 'Total Spots',   rawValue: totalSpots,      unit: '',       color: '#0066FF', index: 0 },
    { icon: MapPin,     title: 'Open Zones',    value: `${availableZones}/${zones.length}`, unit: '', color: '#00C853', index: 1 },
    { icon: Clock,      title: 'Avg Wait Time', value: '8',                unit: ' min',   color: '#FFB300', index: 2 },
    { icon: DollarSign, title: 'Revenue Today', rawValue: Math.round(totalRevenue), unit: '', color: '#7850ff', index: 3, subtitle: 'USD — all zones' },
  ];

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p className="section-label">🅿️ Smart Parking Management</p>
          <h1 className="heading-xl">Parking <span className="text-gradient">Dashboard</span></h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.35rem', fontSize: '0.85rem' }}>
            MetLife Stadium — {totalSpots.toLocaleString()} total spots across {zones.length} zones
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
          <button onClick={fetchData} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1rem', fontSize: '0.8rem' }}>
            <RefreshCw size={14} className={loading ? 'spin' : ''} /> Refresh
          </button>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            Updated: {lastUpdated.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {error && (
        <div className="alert-banner alert-warning" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertTriangle size={14} /> {error}
        </div>
      )}

      {/* KPIs */}
      <div className="grid-responsive-4" style={{ marginBottom: '1.5rem' }}>
        {kpis.map(k => <KPICard key={k.title} {...k} />)}
      </div>

      <div className="grid-sidebar-left" style={{ marginBottom: '1.5rem' }}>
        {/* Zone selector */}
        <ChartCard title="Zone Overview" subtitle="Select a zone to view its parking grid" index={0}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {zones.map((zone, idx) => {
              const occPct = Math.round(((zone.capacity_occupied || zone.occupied || 0) / (zone.capacity_total || zone.total || 1)) * 100);
              const { label, color } = getParkingStatusLabel(occPct);
              const isSelected = selectedIdx === idx;
              return (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedIdx(idx)}
                  style={{
                    background: isSelected ? 'rgba(0,102,255,0.12)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isSelected ? '#0066FF' : 'var(--bg-glass-border)'}`,
                    borderRadius: 12, padding: '1rem', cursor: 'pointer', textAlign: 'left',
                    boxShadow: isSelected ? '0 0 15px rgba(0,102,255,0.2)' : 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.8rem', color: isSelected ? 'var(--color-accent)' : 'var(--text-primary)', marginBottom: '0.3rem' }}>
                    {(zone.zone || '').replace('Zone ', '')}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color }}>{occPct}%</span>
                    <span style={{ fontSize: '0.6rem', padding: '0.15rem 0.5rem', borderRadius: 999, background: `${color}20`, color, border: `1px solid ${color}40`, fontWeight: 700 }}>{label}</span>
                  </div>
                  <div className="progress-bar" style={{ marginTop: '0.4rem', height: 4 }}>
                    <div className="progress-fill" style={{ width: `${occPct}%`, background: color }} />
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                    ${zone.hourly_rate}/hr
                  </div>
                </motion.button>
              );
            })}
          </div>
        </ChartCard>

        {/* Occupancy chart */}
        <ChartCard title="Zone Occupancy" subtitle="All zones at a glance" index={1}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} layout="vertical">
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
        title={`Spot Grid — ${selectedZone?.zone || 'Zone'}`}
        subtitle={`Click an available spot to book · $${selectedZone?.hourly_rate || '0'}/hr`}
        index={2}
      >
        <ParkingGrid
          zone={(selectedZone?.zone || 'P-A1').replace('Zone ', '')}
          rows={8}
          cols={12}
          occupancyRate={Math.round(((selectedZone?.capacity_occupied || selectedZone?.occupied || 0) / (selectedZone?.capacity_total || selectedZone?.total || 1)) * 100) / 100}
        />
      </ChartCard>
    </div>
  );
}
