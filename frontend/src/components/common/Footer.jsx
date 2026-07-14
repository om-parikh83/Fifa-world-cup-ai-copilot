import React from 'react';
import { Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--bg-glass-border)',
      padding: '3rem 2rem 2rem',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #0066FF, #00D4FF)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Trophy size={18} color="white" />
              </div>
              <div>
                <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '0.85rem', color: 'var(--text-primary)' }}>FIFA AI COPILOT</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--color-accent)', fontWeight: 600 }}>WORLD CUP 2026</div>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.7 }}>
              Next-generation AI-powered smart stadium platform for FIFA World Cup 2026.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '1rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Platform</h4>
            {['AI Assistant', 'Navigation', 'Crowd Dashboard', 'Smart Parking', 'Transport'].map(item => (
              <Link key={item} to="/" style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--color-accent)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                {item}
              </Link>
            ))}
          </div>

          {/* Support */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '1rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Support</h4>
            {['Emergency Center', 'Accessibility', 'Contact Us', 'FAQ', 'About'].map(item => (
              <Link key={item} to="/contact" style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--color-accent)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                {item}
              </Link>
            ))}
          </div>

          {/* Stadiums */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '1rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Host Cities</h4>
            {['New York / New Jersey', 'Los Angeles', 'Dallas', 'San Francisco', 'Boston', 'Miami'].map(city => (
              <div key={city} style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-accent)', display: 'inline-block', flexShrink: 0 }} />
                {city}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid var(--bg-glass-border)', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
            © 2026 FIFA AI Smart Stadium Copilot. Built for FIFA World Cup 2026.
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ padding: '0.25rem 0.75rem', background: 'rgba(0,200,83,0.1)', border: '1px solid rgba(0,200,83,0.25)', borderRadius: 999, fontSize: '0.7rem', color: '#00C853', fontWeight: 600 }}>
              🟢 All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
