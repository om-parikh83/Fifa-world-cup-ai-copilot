// Mock Gemini AI service - replace VITE_GEMINI_API_KEY in .env for real responses
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are the FIFA AI Smart Stadium Copilot for the 2026 FIFA World Cup. 
You are an expert stadium assistant helping fans, staff, security, and volunteers at World Cup venues.
You provide concise, helpful answers about:
- Stadium navigation and seat locations
- Parking and transportation
- Food courts and fan zones
- Match schedules and team info
- Crowd and safety information
- Accessibility assistance
- Emergency procedures
Always be friendly, professional, and safety-conscious. Keep responses under 150 words unless detailed directions are needed.`;

const FIFA_RESPONSES = {
  default: [
    "I'm your FIFA AI Copilot! I can help with stadium navigation, parking, transport, food courts, match schedules, and more. What do you need?",
    "Welcome to FIFA World Cup 2026! I'm here to make your experience amazing. Ask me anything about the stadium, matches, or services!",
    "Great question! Let me help you navigate the FIFA World Cup 2026 experience. What would you like to know?",
  ],
  navigation: "To reach your seat in Section **{section}**, take Gate **{gate}** entrance. Follow the blue LED trail signs up to Level {level}. Your seat is approximately 3 minutes from the gate. Need accessible routes? I can guide you to elevator access points.",
  parking: "Parking Zone **P-{zone}** has **{spots} spots available** (updated 2 min ago). The nearest lot to your gate is Zone P-B3. ETA from current traffic: ~8 minutes. I recommend entering via Junction 4 to avoid congestion on Main Blvd.",
  food: "Food Court **FC-3** on Level 2 near Section 114 has the shortest queues right now (~4 min wait). Recommended: Local cuisine stalls (Stall 12-15). Halal, Vegan, and Gluten-Free options are available at Stall 8. Tap-to-pay accepted everywhere.",
  transport: "Next **Metro Line 2** departs Stadium Station in **12 minutes** (Platform 3B). Buses: Route 47 departs every 8 min from Bay D. Ride-sharing pickup zone is at Gate 7 East. Pre-book your ride before the match ends to avoid peak wait times.",
  emergency: "🚨 **Emergency Services**: Nearest medical station is at Gate 4, Section 108. Security posts are at all 12 gates. For urgent help, press the red Emergency button on any stadium kiosk, or text HELP to 26262. First Aid rooms: Levels 1, 2, and 4.",
  crowd: "Current crowd density: **78% capacity** across the stadium. Sections 101-108 are at near-full capacity. I recommend using **Gate 9** or **Gate 11** for entry — 40% shorter queues. Next congestion peak expected at 18:30. Leave 30 min early to beat the rush!",
  schedule: "**Today's Matches at MetLife Stadium:**\n• 16:00 — Brazil 🇧🇷 vs Argentina 🇦🇷 (Group C)\n• 19:00 — France 🇫🇷 vs Germany 🇩🇪 (Group E)\n\nGates open 3 hours before kickoff. VIP entrance via Gate 1.",
  accessibility: "Wheelchair-accessible routes are available from **Gate 2, 4, and 8**. Elevators are located at each main gate. Hearing loop systems are active in Sections 120-135. Visual assistance staff are stationed at Gates 1, 4, and 8. Audio description service available — ask at the Accessibility Desk.",
};

function getSmartResponse(message) {
  const lower = message.toLowerCase();
  if (lower.includes('seat') || lower.includes('section') || lower.includes('navigate') || lower.includes('where')) {
    return FIFA_RESPONSES.navigation
      .replace('{section}', '114-B').replace('{gate}', '5').replace('{level}', '2');
  }
  if (lower.includes('park') || lower.includes('car') || lower.includes('vehicle')) {
    return FIFA_RESPONSES.parking.replace('{zone}', 'B3').replace('{spots}', '247');
  }
  if (lower.includes('food') || lower.includes('eat') || lower.includes('drink') || lower.includes('restaurant')) {
    return FIFA_RESPONSES.food;
  }
  if (lower.includes('bus') || lower.includes('metro') || lower.includes('transport') || lower.includes('uber') || lower.includes('taxi')) {
    return FIFA_RESPONSES.transport;
  }
  if (lower.includes('emergency') || lower.includes('help') || lower.includes('medical') || lower.includes('doctor')) {
    return FIFA_RESPONSES.emergency;
  }
  if (lower.includes('crowd') || lower.includes('busy') || lower.includes('queue') || lower.includes('wait')) {
    return FIFA_RESPONSES.crowd;
  }
  if (lower.includes('schedule') || lower.includes('match') || lower.includes('game') || lower.includes('kickoff')) {
    return FIFA_RESPONSES.schedule;
  }
  if (lower.includes('wheelchair') || lower.includes('accessible') || lower.includes('disability') || lower.includes('accessibility')) {
    return FIFA_RESPONSES.accessibility;
  }
  return FIFA_RESPONSES.default[Math.floor(Math.random() * FIFA_RESPONSES.default.length)];
}

export async function sendMessageToAI(message, history = []) {
  // Try Gemini API first
  if (GEMINI_API_KEY && GEMINI_API_KEY !== 'your_gemini_api_key_here') {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
              ...history.slice(-6).map(m => ({
                role: m.role === 'user' ? 'user' : 'model',
                parts: [{ text: m.content }]
              })),
              { role: 'user', parts: [{ text: message }] }
            ],
            generationConfig: { temperature: 0.7, maxOutputTokens: 300 }
          })
        }
      );
      const data = await response.json();
      if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      }
    } catch (e) {
      console.warn('Gemini API error, using smart mock:', e.message);
    }
  }

  // Smart mock fallback
  await new Promise(r => setTimeout(r, 800 + Math.random() * 800));
  return getSmartResponse(message);
}

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];
