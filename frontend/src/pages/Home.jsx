import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bot, Map, Users, Car, Train, Leaf, HandHeart,
  AlertTriangle, Mic, Globe, Shield, ChevronRight,
  Trophy, Star, Zap, Activity, ArrowRight
} from 'lucide-react';

const FEATURES = [
  { icon: Bot,           title: 'AI Stadium Copilot',     desc: 'Multilingual AI assistant for fans, staff & volunteers. Get answers in 9 languages instantly.',      color: '#0066FF', path: '/ai-assistant' },
  { icon: Map,           title: 'Smart Navigation',        desc: 'Interactive stadium maps with real-time route guidance, wheelchair paths & emergency exits.',         color: '#00D4FF', path: '/navigation'   },
  { icon: Users,         title: 'Crowd Intelligence',      desc: 'Live crowd density heatmaps, gate status, queue prediction & AI-powered congestion forecasting.',    color: '#7850ff', path: '/crowd'        },
  { icon: Car,           title: 'Smart Parking',           desc: 'Real-time parking availability, AI slot recommendations & optimized exit routing.',                  color: '#00C853', path: '/parking'      },
  { icon: Train,         title: 'Transport Hub',           desc: 'Metro, bus & ride-sharing integration with live schedules & AI travel planning.',                    color: '#FFB300', path: '/transport'    },
  { icon: AlertTriangle, title: 'Emergency Response',      desc: 'AI incident detection, medical assistance requests & instant security escalation.',                  color: '#FF3D57', path: '/emergency'    },
  { icon: Leaf,          title: 'Sustainability Monitor',  desc: 'Track energy, water, waste & carbon metrics with AI recommendations for greener stadiums.',          color: '#00C853', path: '/sustainability'},
  { icon: HandHeart,     title: 'Volunteer Hub',           desc: 'AI-powered shift assignments, task routing & communication for 10,000+ World Cup volunteers.',       color: '#ff6b35', path: '/volunteers'   },
];

const STATS = [
  { value: '16', label: 'Host Stadiums', suffix: '', icon: '🏟️' },
  { value: '48', label: 'Nations Competing', suffix: '+', icon: '🌍' },
  { value: '9',  label: 'Languages Supported', suffix: '', icon: '🗣️' },
  { value: '1M', label: 'Daily AI Interactions', suffix: '+', icon: '🤖' },
];

const MATCHES = [
  { time: '16:00', home: 'Brazil 🇧🇷', away: 'Argentina 🇦🇷', group: 'Group C', stadium: 'MetLife Stadium', status: 'live' },
  { time: '19:00', home: 'France 🇫🇷',  away: 'Germany 🇩🇪',   group: 'Group E', stadium: 'SoFi Stadium',    status: 'upcoming' },
  { time: '22:00', home: 'USA 🇺🇸',     away: 'Mexico 🇲🇽',    group: 'Group A', stadium: 'AT&T Stadium',    status: 'upcoming' },
];

const ALERTS = [
  { type: 'warning', msg: '⚠️ Gate 5 congestion — use Gate 7 or Gate 9 for faster entry' },
  { type: 'info',    msg: '🚌 Metro Line 2 running 12-minute extended service after matches' },
  { type: 'success', msg: '✅ Parking Zone P-B3 has 247 available spots — navigate now' },
];

export default function Home() {
  const [alertIdx, setAlertIdx] = useState(0);
  const [animatedStats, setAnimatedStats] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setAlertIdx(i => (i + 1) % ALERTS.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimatedStats(true); }, { threshold: 0.3 });
    const el = document.getElementById('stats-section');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const fadeinUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay }
  });

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* ═══ HERO SECTION ═══ */}
      <section className="hero-bg noise-overlay" style={{ padding: '100px 2rem 80px', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-grid" />

        {/* Glowing orbs */}
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,102,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '5%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <motion.div {...fadeinUp(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1rem', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.25)', borderRadius: 999, marginBottom: '1.5rem' }}>
            <Zap size={14} color="#00D4FF" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#00D4FF', letterSpacing: '0.08em' }}>POWERED BY GOOGLE GEMINI AI</span>
            <span className="pulse-dot green" />
          </motion.div>

          <motion.h1 {...fadeinUp(0.1)} className="heading-hero" style={{ marginBottom: '1rem', color: '#f0f6ff' }}>
            FIFA AI Smart<br />
            <span className="shimmer-text">Stadium Copilot</span>
          </motion.h1>

          <motion.p {...fadeinUp(0.2)} style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#7da3c9', maxWidth: 680, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            The world's most advanced AI-powered stadium platform for FIFA World Cup 2026.
            Real-time intelligence for fans, staff, security & venue operators.
          </motion.p>

          <motion.div {...fadeinUp(0.3)} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <Link to="/ai-assistant" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem', gap: '0.75rem' }}>
              <Bot size={20} /> Launch AI Copilot
            </Link>
            <Link to="/dashboard" className="btn btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
              View Dashboard <ChevronRight size={18} />
            </Link>
          </motion.div>

          {/* Live Alert ticker */}
          <motion.div {...fadeinUp(0.4)} style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
            padding: '0.65rem 1.25rem',
            background: 'rgba(13,31,53,0.8)', border: '1px solid var(--bg-glass-border)',
            borderRadius: 999, backdropFilter: 'blur(10px)', maxWidth: '90vw'
          }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#FF3D57', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>LIVE ALERT</span>
            <span style={{ width: 1, height: 16, background: 'var(--bg-glass-border)' }} />
            <motion.span
              key={alertIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              style={{ fontSize: '0.8rem', color: '#7da3c9' }}>
              {ALERTS[alertIdx].msg}
            </motion.span>
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section id="stats-section" style={{ padding: '4rem 2rem', background: 'var(--bg-surface)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="grid-responsive-4" style={{ gap: '1.5rem' }}>
            {STATS.map((stat, i) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={animatedStats ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass-card"
                style={{ padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: '2.5rem', color: 'var(--color-accent)', lineHeight: 1 }}>
                  {stat.value}<span style={{ fontSize: '1.5rem' }}>{stat.suffix}</span>
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.35rem', fontWeight: 500 }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TODAY'S MATCHES ═══ */}
      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p className="section-label">🏆 FIFA World Cup 2026</p>
              <h2 className="heading-lg">Today's Matches</h2>
            </div>
            <Link to="/dashboard" className="btn btn-secondary" style={{ fontSize: '0.85rem' }}>
              Full Schedule <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {MATCHES.map((match, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card"
                style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {match.status === 'live' ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.2rem 0.65rem', background: 'rgba(255,61,87,0.15)', border: '1px solid rgba(255,61,87,0.4)', borderRadius: 999, fontSize: '0.7rem', fontWeight: 700, color: '#FF3D57' }}>
                      <span className="pulse-dot red" /> LIVE
                    </span>
                  ) : (
                    <span className="badge badge-info">{match.time}</span>
                  )}
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{match.home}</span>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>vs</span>
                  <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{match.away}</span>
                </div>
                <div style={{ textAlign: 'right', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{match.stadium}</div>
                  <div>{match.group}</div>
                </div>
                <Link to="/navigation" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                  Navigate <ChevronRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section style={{ padding: '4rem 2rem', background: 'var(--bg-surface)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="section-label">✦ Platform Features</p>
            <h2 className="heading-xl" style={{ marginBottom: '1rem' }}>
              Everything You Need at the <span className="text-gradient">World Cup</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 550, margin: '0 auto', fontSize: '1rem', lineHeight: 1.7 }}>
              An intelligent ecosystem connecting fans, staff, security, and administrators across 16 FIFA World Cup stadiums.
            </p>
          </div>

          <div className="grid-responsive-4">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.08 }}
                className="feature-card">
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `${f.color}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  <f.icon size={22} color={f.color} />
                </div>
                <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem', color: 'var(--text-primary)' }}>{f.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1.25rem', flex: 1 }}>{f.desc}</p>
                <Link to={f.path} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  fontSize: '0.8rem', fontWeight: 600, color: f.color,
                  textDecoration: 'none'
                }}>
                  Explore <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section style={{ padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(135deg, rgba(0,102,255,0.15), rgba(0,212,255,0.08))',
              border: '1px solid rgba(0,212,255,0.2)',
              borderRadius: 'var(--radius-xl)',
              padding: '4rem 2rem',
              position: 'relative', overflow: 'hidden'
            }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.06), transparent)', pointerEvents: 'none' }} />
            <Trophy size={48} color="#FFB300" style={{ marginBottom: '1.5rem' }} />
            <h2 className="heading-xl" style={{ marginBottom: '1rem' }}>
              Ready for the <span className="text-gradient-gold">World Cup?</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1rem', lineHeight: 1.7 }}>
              Join over 1 million fans and stadium professionals using the FIFA AI Smart Stadium Copilot to make World Cup 2026 unforgettable.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
                Get Started Free
              </Link>
              <Link to="/about" className="btn btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
