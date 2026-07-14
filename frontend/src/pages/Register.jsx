import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ROLES = [
  { value: 'fan', label: '⚽ Football Fan', desc: 'Match-goer, tourist' },
  { value: 'volunteer', label: '🤝 Volunteer', desc: 'Event support staff' },
  { value: 'staff', label: '🏟️ Stadium Staff', desc: 'Venue employee' },
  { value: 'media', label: '📸 Media/Press', desc: 'Journalist, broadcaster' },
];

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'fan', language: 'en', agree: false });
  const [showPass, setShowPass] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleNext = (e) => { e.preventDefault(); setStep(2); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agree) { toast.error('Please accept the terms of service'); return; }
    setLoading(true);
    const result = await register(form);
    setLoading(false);
    if (result.success) {
      toast.success('Welcome to FIFA World Cup 2026! 🏆');
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'var(--grad-hero)' }} />
      <div className="hero-grid" style={{ position: 'absolute', inset: 0 }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ width: '100%', maxWidth: 520, position: 'relative', zIndex: 1 }}>
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: 56, height: 56, background: 'linear-gradient(135deg, #0066FF, #00D4FF)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Trophy size={28} color="white" />
            </div>
            <h2 style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.35rem', color: 'var(--text-primary)' }}>Create Account</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Join FIFA World Cup 2026 Platform</p>
          </div>

          {/* Progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
            {[1, 2].map(s => (
              <React.Fragment key={s}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: step >= s ? 'linear-gradient(135deg, #0066FF, #00D4FF)' : 'rgba(255,255,255,0.08)',
                  color: step >= s ? 'white' : 'var(--text-muted)',
                  fontSize: '0.75rem', fontWeight: 700, flexShrink: 0, transition: 'all 0.3s'
                }}>
                  {step > s ? <Check size={14} /> : s}
                </div>
                {s === 1 && <div style={{ flex: 1, height: 2, background: step > 1 ? 'linear-gradient(90deg,#0066FF,#00D4FF)' : 'rgba(255,255,255,0.08)', transition: 'all 0.3s', borderRadius: 2 }} />}
              </React.Fragment>
            ))}
          </div>

          {step === 1 && (
            <form onSubmit={handleNext} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Full Name</label>
                <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" className="glass-input" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Email Address</label>
                <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" className="glass-input" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input type={showPass ? 'text' : 'password'} required minLength={6} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="Min. 6 characters" className="glass-input" style={{ paddingRight: '3rem' }} />
                  <button type="button" onClick={() => setShowPass(s => !s)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: '1rem', fontSize: '1rem', justifyContent: 'center' }}>
                Continue <ArrowRight size={18} />
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>Select Your Role</label>
                <div className="grid-cols-2" style={{ gap: '0.75rem' }}>
                  {ROLES.map(role => (
                    <button key={role.value} type="button"
                      onClick={() => setForm(f => ({ ...f, role: role.value }))}
                      style={{
                        padding: '0.85rem', borderRadius: 12, cursor: 'pointer', fontFamily: 'Poppins', textAlign: 'left',
                        background: form.role === role.value ? 'rgba(0,102,255,0.2)' : 'rgba(255,255,255,0.04)',
                        border: `1px solid ${form.role === role.value ? 'rgba(0,102,255,0.6)' : 'rgba(255,255,255,0.1)'}`,
                        transition: 'all 0.2s'
                      }}>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{role.label}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{role.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Preferred Language</label>
                <select value={form.language} onChange={e => setForm(f => ({ ...f, language: e.target.value }))} className="glass-input">
                  {[['en','🇺🇸 English'],['es','🇪🇸 Español'],['fr','🇫🇷 Français'],['de','🇩🇪 Deutsch'],['ar','🇸🇦 Arabic'],['hi','🇮🇳 Hindi'],['pt','🇧🇷 Português'],['ja','🇯🇵 Japanese'],['zh','🇨🇳 中文']].map(([code, label]) => (
                    <option key={code} value={code}>{label}</option>
                  ))}
                </select>
              </div>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <input type="checkbox" checked={form.agree} onChange={e => setForm(f => ({ ...f, agree: e.target.checked }))} style={{ marginTop: 2 }} />
                I agree to the FIFA World Cup 2026 Platform <span style={{ color: 'var(--color-accent)' }}>Terms of Service</span> and <span style={{ color: 'var(--color-accent)' }}>Privacy Policy</span>
              </label>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="button" onClick={() => setStep(1)} className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Back</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 2, justifyContent: 'center' }} disabled={loading}>
                  {loading ? 'Creating...' : 'Create Account 🏆'}
                </button>
              </div>
            </form>
          )}

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--color-accent)', fontWeight: 600, textDecoration: 'none' }}>Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
