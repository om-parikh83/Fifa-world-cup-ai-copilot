import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function VoiceHandler({ onTranscript, compact = false }) {
  const [isRecording, setIsRecording] = useState(false);

  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Speech Recognition is not supported by your browser. Please try Chrome.");
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = 'en-US';
    rec.interimResults = false;

    rec.onstart = () => setIsRecording(true);
    rec.onend = () => setIsRecording(false);
    rec.onerror = () => {
      toast.error("Error recognizing speech. Try again.");
      setIsRecording(false);
    };
    rec.onresult = (event) => {
      const text = event.results[0][0].transcript;
      toast.success(`Voice Recognized: "${text}"`);
      if (onTranscript) onTranscript(text);
    };

    rec.start();
  };

  if (compact) {
    return (
      <button
        onClick={startVoice}
        title="Speak to Copilot"
        style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          border: 'none',
          background: isRecording ? 'var(--color-danger)' : 'rgba(0, 102, 255, 0.15)',
          color: isRecording ? 'white' : 'var(--color-accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
          flexShrink: 0,
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
      </button>
    );
  }

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <button
        onClick={startVoice}
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: 'none',
          background: isRecording ? 'var(--color-danger)' : 'var(--grad-accent)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-md)',
          transition: 'transform 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
      </button>
      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
        {isRecording ? "Listening..." : "Tap to speak to Copilot"}
      </span>
    </div>
  );
}
