import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function MetricChart({ data, xKey = 'name', yKey = 'value', color = '#0066FF', title }) {
  return (
    <div className="glass-card" style={{ padding: '1.5rem', height: '320px', display: 'flex', flexDirection: 'column' }}>
      {title && <h4 className="heading-md" style={{ marginBottom: '1.25rem', fontSize: '0.95rem', fontWeight: 700 }}>{title}</h4>}
      <div style={{ flex: 1, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
            <defs>
              <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey={xKey} stroke="var(--text-muted)" fontSize={10} tickLine={false} />
            <YAxis stroke="var(--text-muted)" fontSize={10} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: 'var(--bg-card)',
                border: '1px solid var(--bg-glass-border)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '0.75rem',
                fontFamily: 'Poppins'
              }}
            />
            <Area type="monotone" dataKey={yKey} stroke={color} strokeWidth={2} fillOpacity={1} fill="url(#colorMetric)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
