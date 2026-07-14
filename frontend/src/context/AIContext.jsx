import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { AI_QUICK_REPLIES, SUPPORTED_LANGUAGES } from '../utils/constants';

const AIContext = createContext(null);

const SYSTEM_PROMPT = `You are the FIFA AI Smart Stadium Copilot for the FIFA World Cup 2026. 
You help fans, staff, and security with:
- Navigation within the stadium and transportation
- Parking information and booking
- Match schedules, scores, and team information
- Emergency assistance and safety
- Crowd density and gate status
- Sustainability and eco initiatives
- Volunteer coordination
- General fan experience questions

Always be helpful, concise, friendly, and accurate. Use stadium-specific context.
Current venue: MetLife Stadium, East Rutherford, NJ.
Current date: July 14, 2026 — Match Day 14.`;

// Mock AI responses for fallback when no API key
const MOCK_RESPONSES = {
  park: "🅿️ **Parking at MetLife Stadium:**\n\n• **VIP (P-A1):** Gates open 4h before kickoff — $85/vehicle\n• **North (P-A2):** 85% capacity — $45/vehicle\n• **South (P-B1):** 60% capacity — $40/vehicle ✅ **Recommended**\n• **Remote (P-C1):** 20% capacity — $25 with free shuttle every 10 min\n\nPre-booking recommended via the Parking tab!",
  transport: "🚂 **Getting to MetLife Stadium:**\n\n• **NJ Transit:** From Penn Station → Meadowlands — 22 min, runs every 8 min\n• **NJ Transit:** From Hoboken → Meadowlands — 30 min\n• **Express Bus A:** From Times Square — 45 min\n• **Fan Shuttle B:** From Newark — 20 min ⚠️ Currently delayed 15 min\n\n💡 NJ Transit is the fastest option today!",
  brazil: "🇧🇷 **Brazil at FIFA 2026:**\n\n• **Group:** C — Currently **1st** (6 pts, 6 GF, 1 GA)\n• **Today's Match:** Brazil vs Iran — **LIVE NOW** 🔴 **Score: 2-0** (67')\n• **Venue:** MetLife Stadium, East Rutherford, NJ\n• **Next Match:** Argentina (Group C finale)\n• **Coach:** Fernando Diniz\n• **Top Scorer:** Vinicius Jr. (3 goals)",
  gate: "🚪 **Gate Status — MetLife Stadium:**\n\n• **Gate 1 (VIP):** 🟢 OPEN — 2 min wait\n• **Gate 3 (North):** 🟡 BUSY — 18 min wait\n• **Gate 5 (South):** 🔴 CRITICAL — 34 min wait ⚠️\n• **Gate 7 (East):** 🟢 OPEN — 5 min wait ✅ **Recommended**\n• **Gate 9 (West):** 🟢 OPEN — 7 min wait\n\n💡 Use Gate 7 or 9 for fastest entry right now!",
  medical: "🏥 **Medical & Emergency Services:**\n\n• **Main Medical Center:** Section F, Gate 5 Concourse\n• **First Aid Posts:** Every 500m throughout stadium\n• **Emergency Hotline:** 1-800-FIFA-911\n• **Nearest Defibrillator:** 50m from your location\n\n🆘 For immediate emergencies, contact any yellow-vest volunteer or call security at ext. 2911",
  schedule: "⚽ **Today's FIFA 2026 Matches:**\n\n🔴 **LIVE:** Brazil 🇧🇷 2-0 🇮🇷 Iran — MetLife (67')\n\n📅 **Upcoming:**\n• France 🇫🇷 vs Germany 🇩🇪 — SoFi — 19:00\n• USA 🇺🇸 vs Mexico 🇲🇽 — AT&T — 22:00\n\n✅ **Earlier:**\n• Spain 🇪🇸 3-1 🇳🇱 Netherlands — Allegiant — FULL TIME",
  eco: "🌱 **FIFA 2026 Sustainability Report:**\n\n• ♻️ **Waste Recycled:** 82% — Target: 80% ✅\n• ⚡ **Renewable Energy:** 78% of stadium power\n• 💧 **Water Recycled:** 65% via greywater system\n• 🌳 **Trees Planted:** 5,000 across host cities\n• 🚗 **EVs in Use:** 342 tournament vehicles\n• 🏅 **Certification:** FIFA Green Stadium Level 3",
};

function getMockResponse(message) {
  const m = message.toLowerCase();
  if (m.includes('park') || m.includes('parking')) return MOCK_RESPONSES.park;
  if (m.includes('transport') || m.includes('train') || m.includes('bus') || m.includes('metro') || m.includes('penn')) return MOCK_RESPONSES.transport;
  if (m.includes('brazil') || m.includes('brasil')) return MOCK_RESPONSES.brazil;
  if (m.includes('gate') || m.includes('crowded') || m.includes('queue')) return MOCK_RESPONSES.gate;
  if (m.includes('medical') || m.includes('help') || m.includes('emergency') || m.includes('wheelchair')) return MOCK_RESPONSES.medical;
  if (m.includes('schedule') || m.includes('match') || m.includes('game') || m.includes('today')) return MOCK_RESPONSES.schedule;
  if (m.includes('eco') || m.includes('sustain') || m.includes('green') || m.includes('environment')) return MOCK_RESPONSES.eco;
  return `🤖 I'm your FIFA AI Copilot for World Cup 2026!\n\nI can help with:\n• 🅿️ Parking & directions\n• 🚂 Transport options\n• ⚽ Match schedules & scores\n• 🚪 Gate status & crowds\n• 🏥 Medical & emergency services\n• 🌱 Sustainability info\n\nWhat would you like to know?`;
}

export function AIProvider({ children }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: '👋 Welcome to **FIFA AI Smart Copilot 2026**!\n\nI\'m your intelligent stadium assistant powered by Google Gemini AI. I can help you with parking, transport, match info, gate status, emergency services, and much more.\n\nHow can I assist you today?',
      timestamp: new Date(),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState('en');
  const [conversationId] = useState(() => `conv_${Date.now()}`);
  const abortRef = useRef(null);

  const sendMessage = useCallback(async (content) => {
    if (!content.trim()) return;

    // Add user message
    const userMsg = { id: Date.now(), role: 'user', content, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // Try Gemini API if key is set
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      let responseText;

      if (apiKey && apiKey !== 'your_gemini_api_key_here' && apiKey.length > 10) {
        try {
          const { GoogleGenerativeAI } = await import('@google/generative-ai');
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
          const chat = model.startChat({
            history: messages.map(m => ({
              role: m.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: m.content }],
            })),
            generationConfig: { maxOutputTokens: 500 },
            systemInstruction: SYSTEM_PROMPT,
          });
          const result = await chat.sendMessage(content);
          responseText = result.response.text();
        } catch (apiErr) {
          console.warn('Gemini API error, using mock:', apiErr.message);
          responseText = getMockResponse(content);
        }
      } else {
        // Simulate typing delay for mock
        await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
        responseText = getMockResponse(content);
      }

      const aiMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: '⚠️ I encountered an issue. Please try again or contact stadium staff.',
        timestamp: new Date(),
        isError: true,
      };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
    }
  }, [messages]);

  const clearConversation = useCallback(() => {
    setMessages([{
      id: Date.now(),
      role: 'assistant',
      content: '🔄 Conversation cleared. How can I help you?',
      timestamp: new Date(),
    }]);
  }, []);

  return (
    <AIContext.Provider value={{
      messages, isTyping, language, setLanguage,
      sendMessage, clearConversation,
      quickReplies: AI_QUICK_REPLIES,
      supportedLanguages: SUPPORTED_LANGUAGES,
    }}>
      {children}
    </AIContext.Provider>
  );
}

export const useAI = () => useContext(AIContext);
