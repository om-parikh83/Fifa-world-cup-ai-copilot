import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const DEMO_ACCOUNTS = [
  { email: 'fan@fifa26.com', password: 'fan123', role: 'Fan', icon: '⚽' },
  { email: 'admin@fifa26.com', password: 'admin123', role: 'Admin', icon: '👤' },
  { email: 'security@fifa26.com', password: 'sec123', role: 'Security', icon: '🛡️' },
  { email: 'volunteer@fifa26.com', password: 'vol123', role: 'Volunteer', icon: '🤝' },
];

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(form.email, form.password);
    setLoading(false);
    if (result.success) {
      toast.success(`Welcome back, ${result.user.name}! 🏆`);
      navigate('/dashboard');
    } else {
      toast.error(result.error);
    }
  };

  const quickLogin = async (account) => {
    setLoading(true);
    const result = await login(account.email, account.password);
    setLoading(false);
    if (result.success) {
      toast.success(`Logged in as ${result.user.name}! 🏆`);
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, background: 'var(--grad-hero)' }} />
      <div className="hero-grid" style={{ position: 'absolute', inset: 0 }} />
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,102,255,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '8%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="grid-2col" style={{ width: '100%', maxWidth: 1000, position: 'relative', zIndex: 1, alignItems: 'center' }}>
        {/* Left Branding */}
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          className="login-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 56, height: 56, background: 'linear-gradient(135deg, #0066FF, #00D4FF)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Trophy size={28} color="white" />
            </div>
            <div>
              <div style={{ fontFamily: 'Montserrat', fontWeight: 900, fontSize: '1.25rem', color: 'var(--text-primary)' }}>FIFA AI COPILOT</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-accent)', fontWeight: 600, letterSpacing: '0.08em' }}>WORLD CUP 2026</div>
            </div>
          </div>

          <div>
            <h1 className="heading-xl" style={{ marginBottom: '1rem' }}>
              Your Stadium.<br />
              <span className="text-gradient">Powered by AI.</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
              Sign in to access real-time navigation, crowd intelligence, parking, transport, and your personalized World Cup experience.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { icon: '🗺️', text: 'AI-powered stadium navigation' },
              { icon: '👥', text: 'Real-time crowd & gate intelligence' },
              { icon: '🤖', text: 'Multilingual AI assistant in 9 languages' },
              { icon: '🛡️', text: 'Emergency & security coordination' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Login Card */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card" style={{ padding: '2.5rem' }}>
          <h2 style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Sign In</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>Welcome back to FIFA World Cup 2026</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Email Address</label>
              <input
                type="email" required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="fan@fifa26.com"
                className="glass-input"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'} required
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  placeholder="••••••••"
                  className="glass-input"
                  style={{ paddingRight: '3rem' }}
                />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '1rem', fontSize: '1rem', justifyContent: 'center' }} disabled={loading}>
              {loading ? 'Signing in...' : <>Sign In <ArrowRight size={18} /></>}
            </button>
          </form>

          <div style={{ margin: '1.5rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="divider" style={{ flex: 1, margin: 0 }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Quick Demo Login</span>
            <div className="divider" style={{ flex: 1, margin: 0 }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {DEMO_ACCOUNTS.map(acc => (
              <button key={acc.role} onClick={() => quickLogin(acc)}
                style={{
                  background: 'rgba(0,102,255,0.08)', border: '1px solid rgba(0,102,255,0.2)',
                  borderRadius: 10, padding: '0.65rem', cursor: 'pointer', fontFamily: 'Poppins',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,102,255,0.15)'; e.currentTarget.style.color = '#00D4FF'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,102,255,0.08)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
                <span>{acc.icon}</span> {acc.role}
              </button>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }}>Create Account</Link>
          </p>
        </motion.div>
      </div>

      <style>{`@media(max-width:768px){.login-left{display:none}}`}</style>
    </div>
  );
}
