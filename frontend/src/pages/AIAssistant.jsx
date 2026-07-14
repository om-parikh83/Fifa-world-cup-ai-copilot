import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, MessageSquare, Globe, Mic, Languages } from 'lucide-react';
import ChatInterface from '../components/ai/ChatInterface';
import { AI_QUICK_REPLIES } from '../utils/constants';
import { useAI } from '../context/AIContext';

const FEATURES = [
  { icon: MessageSquare, title: 'Natural Language', desc: 'Ask anything in plain language about the stadium, matches, or transport.' },
  { icon: Globe,         title: '8 Languages',      desc: 'Get responses in English, Spanish, French, Portuguese, German, Arabic, Japanese, or Chinese.' },
  { icon: Sparkles,      title: 'Gemini Powered',   desc: 'Backed by Google Gemini 1.5 Flash for accurate, real-time stadium intelligence.' },
];

export default function AIAssistant() {
  const { sendMessage } = useAI();

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p className="section-label">⚡ Powered by Google Gemini AI</p>
        <h1 className="heading-xl">
          FIFA <span className="text-gradient">AI Copilot</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.35rem', fontSize: '0.9rem' }}>
          Your intelligent stadium assistant — ask anything about matches, transport, parking, or emergencies.
        </p>
      </div>

      {/* Feature pills */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {FEATURES.map(f => (
          <div key={f.title} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.85rem', background: 'rgba(0,102,255,0.08)', border: '1px solid rgba(0,102,255,0.2)', borderRadius: 999, fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <f.icon size={13} color="#00D4FF" />
            <span style={{ fontWeight: 600, color: '#00D4FF' }}>{f.title}</span>
            <span>{f.desc}</span>
          </div>
        ))}
      </div>

      <div className="ai-assistant-container">
        {/* Main Chat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card ai-chat-card"
        >
          <ChatInterface />
        </motion.div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
          {/* Quick replies */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }} className="glass-card" style={{ padding: '1.25rem' }}>
            <h3 className="heading-md" style={{ marginBottom: '0.85rem', fontSize: '0.95rem' }}>
              💡 Quick Questions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {AI_QUICK_REPLIES.map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '0.6rem 0.85rem',
                    background: 'rgba(0,102,255,0.05)', border: '1px solid rgba(0,102,255,0.15)',
                    borderRadius: 10, cursor: 'pointer', color: 'var(--text-secondary)',
                    fontSize: '0.78rem', fontWeight: 500, lineHeight: 1.4,
                    transition: 'all 0.2s',
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.background = 'rgba(0,102,255,0.12)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.background = 'rgba(0,102,255,0.05)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.borderColor = 'rgba(0,102,255,0.15)';
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Status */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="glass-card" style={{ padding: '1.25rem' }}>
            <h3 className="heading-md" style={{ marginBottom: '0.85rem', fontSize: '0.95rem' }}>🤖 AI Status</h3>
            {[
              { label: 'Gemini 1.5 Flash', status: 'Online', color: '#00C853' },
              { label: 'Stadium Data',     status: 'Live',   color: '#00C853' },
              { label: 'Language Engine',  status: '8 langs',color: '#0066FF' },
              { label: 'Response Time',    status: '<1.2s',  color: '#FFB300' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid var(--bg-glass-border)', fontSize: '0.78rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{s.label}</span>
                <span style={{ color: s.color, fontWeight: 700 }}>{s.status}</span>
              </div>
            ))}
          </motion.div>

          {/* Tips */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }} className="glass-card" style={{ padding: '1.25rem', background: 'rgba(0,212,255,0.04)' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--color-accent)' }}>💬 Pro Tips</h3>
            <ul style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.7, paddingLeft: '1rem' }}>
              <li>Ask for gate recommendations to avoid long queues</li>
              <li>Get real-time parking availability before you arrive</li>
              <li>Request match schedule in your language</li>
              <li>Ask for eco-friendly transport options</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
