import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Bot, Users, Globe, Zap, Shield, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TEAM = [
  { name: 'AI Stadium Copilot', role: 'Powered by Google Gemini AI', icon: '🤖' },
  { name: 'FIFA Operations', role: 'World Cup 2026 Technology Partner', icon: '🏆' },
  { name: 'Stadium Intelligence', role: 'Real-time crowd & venue analytics', icon: '📊' },
  { name: 'Global Accessibility', role: '9 languages, full inclusivity', icon: '🌍' },
];

const MILESTONES = [
  { year: '2024', event: 'Platform concept & AI architecture design' },
  { year: 'Jan 2025', event: 'Core AI engine development with Gemini API' },
  { year: 'Jun 2025', event: 'Pilot testing at 3 major stadiums' },
  { year: 'Jan 2026', event: 'Full deployment across 16 FIFA stadiums' },
  { year: 'Jul 2026', event: 'FIFA World Cup 2026 — Live Production' },
];

export default function About() {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero */}
      <section className="hero-bg noise-overlay" style={{ padding: '80px 2rem 60px', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-grid" />
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.25)', borderRadius: 999, marginBottom: '1.5rem' }}>
              <Trophy size={14} color="#FFB300" />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#00D4FF', letterSpacing: '0.08em' }}>FIFA WORLD CUP 2026 PLATFORM</span>
            </div>
            <h1 className="heading-hero" style={{ marginBottom: '1rem' }}>About <span className="text-gradient">FIFA AI Copilot</span></h1>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: 650, margin: '0 auto', lineHeight: 1.7 }}>
              The world's first enterprise-grade, GenAI-powered smart stadium platform built specifically for FIFA World Cup 2026. Transforming how 6 million fans experience the beautiful game.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: '4rem 2rem', background: 'var(--bg-surface)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }} className="grid-2col">
          <div>
            <p className="section-label">Our Mission</p>
            <h2 className="heading-xl" style={{ marginBottom: '1.25rem' }}>Redefining Stadium Intelligence</h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
              FIFA AI Smart Stadium Copilot is engineered to make FIFA World Cup 2026 the most technologically advanced tournament in football history. Every fan, every staff member, every volunteer — all empowered by AI.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
              From navigating to your seat to managing crowd emergencies in real-time, our platform brings the power of Google Gemini AI directly to stadium operations at scale.
            </p>
            <Link to="/ai-assistant" className="btn btn-primary" style={{ fontSize: '0.95rem' }}>
              <Bot size={18} /> Try AI Copilot <ChevronRight size={16} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[['🎯','Purpose-Built for FIFA','Designed specifically for World Cup scale — 16 stadiums, 48 teams, 6M fans'],
              ['🤖','Gemini AI Powered','Google Gemini API with smart fallback, 9-language support, and voice interfaces'],
              ['🛡️','Enterprise Security','JWT authentication, role-based access, encrypted APIs, and audit logs'],
              ['♿','Fully Accessible','WCAG 2.1 compliant, voice guidance, sign language support, wheelchair routing']
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14 }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
          <p className="section-label">Platform Timeline</p>
          <h2 className="heading-xl">Our Journey</h2>
        </div>
        <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'var(--bg-glass-border)', transform: 'translateX(-50%)' }} />
          {MILESTONES.map((m, i) => (
            <motion.div key={m.year} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', marginBottom: '1.5rem', position: 'relative' }}>
              <div style={{ maxWidth: '42%', padding: '1rem', background: 'var(--bg-glass)', border: '1px solid var(--bg-glass-border)', borderRadius: 14, backdropFilter: 'blur(10px)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: 700, marginBottom: '0.35rem' }}>{m.year}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{m.event}</div>
              </div>
              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: 12, height: 12, borderRadius: '50%', background: 'var(--color-accent)', border: '3px solid var(--bg-base)' }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 2rem', background: 'var(--bg-surface)' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <h2 className="heading-xl" style={{ marginBottom: '1rem' }}>Ready to Experience It?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.7 }}>Join millions of fans, staff, and administrators on the most advanced FIFA stadium platform ever built.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>Get Started</Link>
            <Link to="/contact" className="btn btn-secondary" style={{ padding: '1rem 2rem' }}>Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
