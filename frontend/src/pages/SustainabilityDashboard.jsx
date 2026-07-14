import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Zap, Droplets, Recycle, Sun, TreeDeciduous, Car, Award } from 'lucide-react';
import KPICard from '../components/dashboard/KPICard';
import ChartCard from '../components/dashboard/ChartCard';
import { ECO_METRICS } from '../utils/constants';
import { getEcoGrade } from '../utils/helpers';
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';

const MONTHLY_CARBON = [
  { month: 'Jun', carbon: 8200, target: 9000, saved: 800 },
  { month: 'Jul', carbon: 7400, target: 8000, saved: 600 },
  { month: 'Aug', carbon: 6100, target: 7500, saved: 1400 },
  { month: 'Sep', carbon: 5200, target: 7000, saved: 1800 },
];

const ECO_GOALS = [
  { label: 'Renewable Energy',  current: ECO_METRICS.renewableEnergy, target: 80,  color: '#FFB300', icon: Sun },
  { label: 'Waste Recycled',    current: ECO_METRICS.wasteRecycled,   target: 80,  color: '#00C853', icon: Recycle },
  { label: 'Water Recycled',    current: ECO_METRICS.waterRecycled,   target: 70,  color: '#00D4FF', icon: Droplets },
  { label: 'Carbon Reduction',  current: 62,                           target: 75,  color: '#7850ff', icon: Leaf },
];

export default function SustainabilityDashboard() {
  const overallScore = Math.round((ECO_METRICS.renewableEnergy + ECO_METRICS.wasteRecycled + ECO_METRICS.waterRecycled + 62) / 4);
  const { grade, color: gradeColor } = getEcoGrade(overallScore);

  const kpis = [
    { icon: Leaf,          title: 'Carbon Saved',     rawValue: ECO_METRICS.carbonSaved, unit: ' t CO₂',  color: '#00C853', index: 0, subtitle: 'vs diesel baseline' },
    { icon: Sun,           title: 'Renewable Energy', value: `${ECO_METRICS.renewableEnergy}`, unit: '%', color: '#FFB300', index: 1, change: 12, positive: true },
    { icon: Recycle,       title: 'Waste Recycled',   value: `${ECO_METRICS.wasteRecycled}`,   unit: '%', color: '#0066FF', index: 2, change: 8, positive: true },
    { icon: TreeDeciduous, title: 'Trees Planted',    rawValue: ECO_METRICS.treesPlanted,      unit: '',  color: '#00C853', index: 3 },
  ];

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <p className="section-label">🌱 FIFA Green Initiative 2026</p>
          <h1 className="heading-xl">Sustainability <span className="text-gradient">Dashboard</span></h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.35rem', fontSize: '0.85rem' }}>
            {ECO_METRICS.greenCertification}
          </p>
        </div>
        <div style={{ textAlign: 'center', padding: '1rem 1.5rem', background: `${gradeColor}15`, border: `2px solid ${gradeColor}40`, borderRadius: 16 }}>
          <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: '2.5rem', color: gradeColor, lineHeight: 1 }}>{grade}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.08em', marginTop: '0.3rem' }}>ECO RATING</div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: gradeColor }}>{overallScore}/100</div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid-responsive-4" style={{ marginBottom: '1.5rem' }}>
        {kpis.map(k => <KPICard key={k.title} {...k} />)}
      </div>

      {/* Goals progress + Carbon chart */}
      <div className="grid-2col" style={{ marginBottom: '1.5rem' }}>
        <ChartCard title="Sustainability Goals" subtitle="Progress toward FIFA 2026 targets" index={0}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {ECO_GOALS.map((goal, i) => {
              const Icon = goal.icon;
              const pct = Math.round((goal.current / goal.target) * 100);
              const achieved = goal.current >= goal.target;
              return (
                <motion.div key={goal.label} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 600 }}>
                      <Icon size={14} color={goal.color} />
                      {goal.label}
                    </div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ color: goal.color }}>{goal.current}%</span>
                      <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>/ {goal.target}%</span>
                      {achieved && <span style={{ fontSize: '0.7rem', color: '#00C853' }}>✅</span>}
                    </div>
                  </div>
                  <div className="progress-bar">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, (goal.current / goal.target) * 100)}%` }}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: i * 0.1 }}
                      style={{ background: achieved ? '#00C853' : goal.color }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </ChartCard>

        <ChartCard title="Carbon Emissions vs Target" subtitle="Tonnes CO₂ per month" index={1}>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MONTHLY_CARBON}>
              <defs>
                <linearGradient id="carbonGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF3D57" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FF3D57" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00C853" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#00C853" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--bg-glass-border)', borderRadius: 12, color: 'var(--text-primary)', fontSize: 12 }} />
              <Area type="monotone" dataKey="carbon" name="Actual CO₂" stroke="#FF3D57" strokeWidth={2} fill="url(#carbonGrad)" />
              <Area type="monotone" dataKey="target" name="Target"     stroke="#00C853" strokeWidth={2} fill="url(#targetGrad)" strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Eco highlights */}
      <ChartCard title="Green Initiatives" index={2}>
        <div className="grid-responsive-4">
          {[
            { icon: '☀️', label: 'Solar Panels',        value: `${ECO_METRICS.solarPanels.toLocaleString()}`, unit: 'panels installed' },
            { icon: '🚗', label: 'Electric Vehicles',   value: ECO_METRICS.electricVehicles.toString(),       unit: 'EVs in operation' },
            { icon: '🧴', label: 'Plastic Avoided',     value: '850K',                                        unit: 'bottles eliminated' },
            { icon: '💧', label: 'Water Recycled',      value: `${ECO_METRICS.waterRecycled}%`,               unit: 'via greywater system' },
          ].map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}
              style={{ textAlign: 'center', padding: '1.25rem', background: 'rgba(0,200,83,0.05)', border: '1px solid rgba(0,200,83,0.2)', borderRadius: 12 }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
              <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '1.5rem', color: '#00C853' }}>{item.value}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.3rem', fontWeight: 600 }}>{item.label}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>{item.unit}</div>
            </motion.div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}
