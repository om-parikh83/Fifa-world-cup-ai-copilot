import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { User, Edit, Camera, Trophy, Star, Clock, MapPin, Globe } from 'lucide-react';

const MATCH_HISTORY = [
  { match: 'Brazil vs Argentina', date: 'Jul 8', stadium: 'MetLife', seat: '114-B-23', rating: 5 },
  { match: 'France vs Germany',   date: 'Jul 5', stadium: 'SoFi',    seat: '88-A-14',  rating: 4 },
  { match: 'USA vs Mexico',       date: 'Jul 2', stadium: 'AT&T',    seat: 'VIP-12',  rating: 5 },
];

export default function Profile() {
  const { user, logout } = useAuth();
  const [editing, setEditing] = useState(false);

  if (!user) return (
    <div className="page-wrapper" style={{ textAlign: 'center', padding: '4rem' }}>
      <Trophy size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
      <h2 className="heading-lg">Please log in to view your profile</h2>
    </div>
  );

  return (
    <div className="page-wrapper">
      <p className="section-label">👤 My Account</p>
      <h1 className="heading-xl" style={{ marginBottom: '2rem' }}>User Profile</h1>

      <div className="grid-sidebar-right">
        {/* Profile Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.25rem' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#0066FF,#00D4FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto', border: '3px solid rgba(0,212,255,0.3)' }}>
                {user.avatar}
              </div>
              <button style={{ position: 'absolute', bottom: 0, right: 0, width: 26, height: 26, borderRadius: '50%', background: 'rgba(0,102,255,0.8)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Camera size={12} />
              </button>
            </div>
            <h2 style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>{user.name}</h2>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.85rem', background: 'rgba(0,102,255,0.12)', border: '1px solid rgba(0,102,255,0.3)', borderRadius: 999, fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'capitalize', marginBottom: '0.75rem' }}>
              {user.role}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{user.email}</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {[['3','Matches','🏟️'],['15','AI Chats','🤖'],['4.9','Avg Rating','⭐'],['1','Tickets','🎫']].map(([v,l,i]) => (
                <div key={l} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.04)', borderRadius: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>{i}</div>
                  <div style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-accent)' }}>{v}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{l}</div>
                </div>
              ))}
            </div>

            <button onClick={() => setEditing(!editing)} className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}>
              <Edit size={14} /> {editing ? 'Cancel Editing' : 'Edit Profile'}
            </button>
          </div>

          {/* Badges */}
          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>🏅 Fan Badges</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['⚽ Die-Hard Fan','🌍 World Traveler','🤖 AI Pioneer','🏟️ Stadium Pro','♻️ Green Fan','🌟 VIP'].map(b => (
                <span key={b} style={{ padding: '0.3rem 0.75rem', background: 'rgba(255,179,0,0.1)', border: '1px solid rgba(255,179,0,0.3)', borderRadius: 999, fontSize: '0.7rem', fontWeight: 600, color: '#FFB300' }}>{b}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {editing ? (
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 className="heading-md" style={{ marginBottom: '1.25rem' }}>Edit Profile</h3>
              <div className="grid-cols-2" style={{ gap: '1rem' }}>
                {['Full Name','Email','Phone','Nationality','Language','Ticket ID'].map(field => (
                  <div key={field}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>{field}</label>
                    <input className="glass-input" defaultValue={field === 'Full Name' ? user.name : field === 'Email' ? user.email : ''} placeholder={`Enter ${field.toLowerCase()}`} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
                <button className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Save Changes</button>
                <button onClick={() => setEditing(false)} className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem' }}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <h3 className="heading-md" style={{ marginBottom: '1.25rem' }}>Match History</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {MATCH_HISTORY.map((m, i) => (
                  <div key={i} style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '1.75rem' }}>⚽</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>{m.match}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <Clock size={11} style={{ display: 'inline', marginRight: 3 }} />{m.date}
                        <span style={{ margin: '0 0.5rem' }}>·</span>
                        <MapPin size={11} style={{ display: 'inline', marginRight: 3 }} />{m.stadium}
                        <span style={{ margin: '0 0.5rem' }}>·</span>
                        Seat: {m.seat}
                      </div>
                    </div>
                    <div style={{ color: '#FFB300', fontSize: '0.9rem' }}>{'★'.repeat(m.rating)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 className="heading-md" style={{ marginBottom: '1rem' }}>My AI Preferences</h3>
            <div className="grid-cols-2" style={{ gap: '1rem', fontSize: '0.85rem' }}>
              {[
                ['Language','🇺🇸 English'],['Notifications','Enabled'],['Voice Mode','Enabled'],['Accessibility','Standard'],
                ['AI Suggestions','Personalized'],['Data Sharing','Anonymous Only']
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: 10 }}>
                  <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-accent)' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
