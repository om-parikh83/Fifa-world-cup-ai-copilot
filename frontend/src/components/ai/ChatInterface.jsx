import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, Trash2, Globe } from 'lucide-react';
import { useAI } from '../../context/AIContext';
import VoiceHandler from './VoiceHandler';

function MessageBubble({ msg }) {
  const isUser = msg.role === 'user';

  const renderContent = (text) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
        j % 2 === 1 ? <strong key={j}>{part}</strong> : part
      );
      return <span key={i}>{parts}{i < text.split('\n').length - 1 && <br />}</span>;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
      style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', gap: '0.75rem', alignItems: 'flex-end' }}
    >
      {!isUser && (
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #0066FF, #00D4FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Bot size={16} color="white" />
        </div>
      )}
      <div className={isUser ? 'chat-bubble-user' : 'chat-bubble-ai'} style={{ lineHeight: 1.55 }}>
        {renderContent(msg.content)}
        <div style={{ fontSize: '0.65rem', color: isUser ? 'rgba(255,255,255,0.6)' : 'var(--text-muted)', marginTop: '0.4rem' }}>
          {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem' }}>
      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #0066FF, #00D4FF)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Bot size={16} color="white" />
      </div>
      <div className="chat-bubble-ai" style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '0.75rem 1rem' }}>
        <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
      </div>
    </div>
  );
}

export default function ChatInterface() {
  const { messages, isTyping, sendMessage, clearConversation, quickReplies, language, setLanguage, supportedLanguages } = useAI();
  const [input, setInput] = React.useState('');
  const [showLang, setShowLang] = React.useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);

  const handleSend = (text) => {
    const msg = (text || input).trim();
    if (!msg) return;
    sendMessage(msg);
    setInput('');
    inputRef.current?.focus();
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', borderBottom: '1px solid var(--bg-glass-border)', background: 'rgba(0,102,255,0.04)' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #0066FF, #00D4FF)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={18} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>FIFA AI Copilot</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.68rem', color: '#00C853' }}>
              <span className="pulse-dot green" /> Online — Powered by Gemini AI
            </div>
          </div>
        </div>

        {/* Language picker */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => setShowLang(s => !s)} style={{ background: 'var(--bg-glass)', border: '1px solid var(--bg-glass-border)', borderRadius: 8, padding: '0.4rem 0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 600 }}>
            <Globe size={14} />
            {supportedLanguages?.find(l => l.code === language)?.flag}
          </button>
          {showLang && (
            <div style={{ position: 'absolute', right: 0, top: '110%', background: 'var(--bg-surface)', border: '1px solid var(--bg-glass-border)', borderRadius: 12, padding: '0.5rem', zIndex: 50, minWidth: 160, boxShadow: 'var(--shadow-lg)' }}>
              {supportedLanguages?.map(lang => (
                <button key={lang.code} onClick={() => { setLanguage(lang.code); setShowLang(false); }}
                  style={{ width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem', background: language === lang.code ? 'rgba(0,102,255,0.1)' : 'none', border: 'none', borderRadius: 8, cursor: 'pointer', color: 'var(--text-primary)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {lang.flag} {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <button onClick={clearConversation} title="Clear" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '0.4rem', borderRadius: 8 }}>
          <Trash2 size={16} />
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <AnimatePresence>
          {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
          {isTyping && <TypingIndicator key="typing" />}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Quick replies */}
      {messages.length <= 2 && (
        <div style={{ padding: '0.75rem 1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', borderTop: '1px solid var(--bg-glass-border)' }}>
          {quickReplies?.slice(0, 5).map(reply => (
            <button key={reply} onClick={() => handleSend(reply)} style={{ background: 'rgba(0,102,255,0.08)', border: '1px solid rgba(0,102,255,0.2)', borderRadius: 999, padding: '0.35rem 0.85rem', cursor: 'pointer', color: '#00D4FF', fontSize: '0.72rem', fontWeight: 600 }}>
              {reply}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ padding: '1rem', borderTop: '1px solid var(--bg-glass-border)', display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
        <textarea
          ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
          placeholder="Ask me anything about the stadium, matches, transport..."
          rows={1} style={{ flex: 1, resize: 'none', maxHeight: 120, background: 'rgba(13,31,53,0.6)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: 12, padding: '0.75rem 1rem', color: 'var(--text-primary)', fontFamily: 'Poppins', fontSize: '0.875rem', outline: 'none' }}
          onFocus={e => e.target.style.borderColor = 'var(--color-accent)'}
          onBlur={e => e.target.style.borderColor = 'rgba(0,212,255,0.2)'}
        />
        <VoiceHandler onTranscript={(text) => handleSend(text)} compact={true} />
        <button onClick={() => handleSend()} disabled={!input.trim() || isTyping} className="btn btn-primary" style={{ padding: '0.75rem', borderRadius: 12, flexShrink: 0 }}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
