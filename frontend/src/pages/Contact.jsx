import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Bot, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const FAQS = [
  { q: 'How does the AI Stadium Copilot work?', a: 'Powered by Google Gemini AI, the copilot understands natural language queries about navigation, parking, transport, and stadium services in 9 languages.' },
  { q: 'Is the platform available offline?', a: 'Core navigation features work offline. AI chat and real-time data require internet connectivity.' },
  { q: 'Which languages are supported?', a: 'English, Spanish, French, German, Arabic, Hindi, Portuguese, Japanese, and Chinese.' },
  { q: 'How do I report an emergency?', a: 'Use the Emergency Center page or text HELP to 26262 from anywhere in the stadium. Medical staff respond within 3 minutes.' },
  { q: 'Can I pre-book parking?', a: 'Yes! Navigate to the Smart Parking page to reserve your spot up to 48 hours before the match.' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', category: 'general', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Message sent! We\'ll respond within 2 hours. 🏆');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero */}
      <section className="hero-bg noise-overlay" style={{ padding: '60px 2rem 50px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <div className="hero-grid" />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="section-label">📞 Get In Touch</p>
            <h1 className="heading-xl" style={{ marginBottom: '1rem' }}>Contact & Support</h1>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Our 24/7 support team is ready to help fans, staff, and administrators with any FIFA World Cup 2026 platform needs.
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="grid-2col">
            {/* Contact Form */}
            <div>
              <h2 className="heading-lg" style={{ marginBottom: '1.5rem' }}>Send a Message</h2>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                  <CheckCircle size={48} color="#00C853" style={{ margin: '0 auto 1rem' }} />
                  <h3 style={{ color: '#00C853', fontFamily: 'Montserrat', fontWeight: 800, marginBottom: '0.5rem' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>We'll respond within 2 hours. Check your email for confirmation.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '2rem' }}>
                  <div className="grid-cols-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
                      <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" className="glass-input" required />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Email</label>
                      <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" className="glass-input" required />
                    </div>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Category</label>
                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="glass-input">
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="navigation">Navigation Help</option>
                      <option value="emergency">Emergency Query</option>
                      <option value="accessibility">Accessibility Support</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Message</label>
                    <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="How can we help you?" className="glass-input" rows={5} style={{ resize: 'vertical' }} required />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '0.95rem' }}>
                    <Send size={16} /> Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info + FAQ */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Info Cards */}
              <div className="grid-cols-2" style={{ gap: '1rem' }}>
                {[
                  { icon: Phone, title: 'Emergency Line', value: '26262', sub: '24/7 Stadium Hotline', color: '#FF3D57' },
                  { icon: Bot, title: 'AI Copilot', value: 'Chat Now', sub: 'Instant AI answers', color: '#0066FF', link: true },
                  { icon: Mail, title: 'Email Support', value: 'support@fifa26.ai', sub: '< 2hr response', color: '#00C853' },
                  { icon: Clock, title: 'Support Hours', value: '24 / 7', sub: 'Match days & off-season', color: '#00D4FF' },
                ].map(c => (
                  <div key={c.title} className="glass-card" style={{ padding: '1.25rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `${c.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                      <c.icon size={18} color={c.color} />
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{c.title}</div>
                    <div style={{ fontWeight: 700, color: c.color, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{c.value}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{c.sub}</div>
                  </div>
                ))}
              </div>

              {/* FAQ */}
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 className="heading-md" style={{ marginBottom: '1.25rem' }}>Frequently Asked Questions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {FAQS.map((faq, i) => (
                    <div key={i} style={{ border: '1px solid var(--bg-glass-border)', borderRadius: 12, overflow: 'hidden' }}>
                      <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        style={{ width: '100%', padding: '1rem', background: openFaq === i ? 'rgba(0,102,255,0.1)' : 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', textAlign: 'left', fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                        {faq.q}
                        <span style={{ fontSize: '1.1rem', flexShrink: 0, color: 'var(--color-accent)', transition: 'transform 0.2s', display: 'inline-block', transform: openFaq === i ? 'rotate(180deg)' : 'none' }}>▾</span>
                      </button>
                      {openFaq === i && (
                        <div style={{ padding: '0.85rem 1rem 1rem', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.7, borderTop: '1px solid var(--bg-glass-border)', background: 'rgba(0,0,0,0.1)' }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
