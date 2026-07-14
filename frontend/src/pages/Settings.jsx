import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Globe, Moon, Eye, Smartphone, Save } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SUPPORTED_LANGUAGES } from '../services/aiService';
import toast from 'react-hot-toast';

const ToggleSwitch = ({ enabled, onChange, id }) => (
  <button id={id} role="switch" aria-checked={enabled} onClick={() => onChange(!enabled)}
    style={{ width: 44, height: 24, borderRadius: 12, background: enabled ? 'linear-gradient(135deg,#0066FF,#00D4FF)' : 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'all 0.3s', flexShrink: 0 }}>
    <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: enabled ? 23 : 3, transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
  </button>
);

export default function SettingsPage() {
  const { theme, toggleTheme, isDark, themeColor, setThemeColor } = useTheme();
  const [language, setLanguage] = useState('en');
  const [notifs, setNotifs] = useState({ push: true, email: false, crowd: true, emergency: true, transport: true, parking: false });
  const [privacy, setPrivacy] = useState({ analytics: true, personalization: true, location: true });

  const save = () => toast.success('Settings saved! ✅');

  return (
    <div className="page-wrapper">
      <p className="section-label">⚙️ Preferences</p>
      <h1 className="heading-xl" style={{ marginBottom: '2rem' }}>Settings</h1>

      <div className="grid-2col">
        {/* Appearance */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div className="icon-bg icon-bg-cyan"><Eye size={18} /></div>
            <h3 className="heading-md" style={{ margin: 0 }}>Appearance</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem', background: 'rgba(255,255,255,0.03)', borderRadius: 12 }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>Dark Mode</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>FIFA premium dark interface</div>
              </div>
              <ToggleSwitch id="dark-mode" enabled={isDark} onChange={toggleTheme} />
            </div>
            <div style={{ padding: '0.85rem', background: 'rgba(255,255,255,0.03)', borderRadius: 12 }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>Theme Color</div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {[
                  { id: 'blue', color: '#0066FF', name: 'Blue (Default)' },
                  { id: 'purple', color: '#7850ff', name: 'Purple' },
                  { id: 'green', color: '#00C853', name: 'Green' },
                  { id: 'gold', color: '#FFB300', name: 'Gold' }
                ].map(({ id, color, name }) => (
                  <button key={id} title={name} onClick={() => setThemeColor(id)}
                    style={{ width: 28, height: 28, borderRadius: '50%', background: color, border: themeColor === id ? '3px solid white' : '2px solid transparent', cursor: 'pointer', transition: 'transform 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div className="icon-bg icon-bg-blue"><Globe size={18} /></div>
            <h3 className="heading-md" style={{ margin: 0 }}>Language & Region</h3>
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>AI Assistant Language</label>
            <select value={language} onChange={e => setLanguage(e.target.value)} className="glass-input" style={{ marginBottom: '1rem' }}>
              {SUPPORTED_LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.flag} {l.name}</option>)}
            </select>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Timezone</label>
            <select className="glass-input">
              <option>UTC-5 (Eastern Standard Time)</option>
              <option>UTC-8 (Pacific Standard Time)</option>
              <option>UTC+0 (GMT)</option>
              <option>UTC+5:30 (IST)</option>
            </select>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div className="icon-bg icon-bg-yellow"><Bell size={18} /></div>
            <h3 className="heading-md" style={{ margin: 0 }}>Notifications</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {Object.entries(notifs).map(([key, val]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: 12 }}>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.875rem', textTransform: 'capitalize' }}>{key} Alerts</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{key === 'push' ? 'Browser & mobile notifications' : key === 'email' ? 'Email digest & updates' : `Real-time ${key} updates`}</div>
                </div>
                <ToggleSwitch id={`notif-${key}`} enabled={val} onChange={v => setNotifs(n => ({ ...n, [key]: v }))} />
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div className="icon-bg icon-bg-green"><Shield size={18} /></div>
            <h3 className="heading-md" style={{ margin: 0 }}>Privacy & Data</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {Object.entries(privacy).map(([key, val]) => (
              <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: 12 }}>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.875rem', textTransform: 'capitalize' }}>{key}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{key === 'analytics' ? 'Help improve the platform' : key === 'personalization' ? 'AI-powered recommendations' : 'Location-based features'}</div>
                </div>
                <ToggleSwitch id={`privacy-${key}`} enabled={val} onChange={v => setPrivacy(n => ({ ...n, [key]: v }))} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1.25rem', padding: '1rem', background: 'rgba(0,200,83,0.08)', border: '1px solid rgba(0,200,83,0.2)', borderRadius: 12, fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            🔒 Your data is encrypted and processed according to FIFA's Global Privacy Policy. Location data is never stored permanently.
          </div>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={save} className="btn btn-primary" style={{ padding: '0.85rem 2.5rem', fontSize: '0.95rem' }}>
          <Save size={16} /> Save All Settings
        </button>
      </div>
    </div>
  );
}
