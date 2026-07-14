# FIFA AI Smart Stadium Copilot — Implementation Plan

## Overview

A production-ready, GenAI-powered smart stadium platform for FIFA World Cup 2026. This plan covers the complete full-stack build: React/Vite frontend, Django REST backend, MySQL schema, and all 17 pages with premium FIFA-inspired UI.

---

## Scope of This Build

Given the scale of this platform, here is the phased delivery plan for this session:

### Phase 1 — Foundation (This Session)
- Complete React/Vite project scaffolding with Tailwind CSS
- Full routing (17 pages)
- Premium FIFA-inspired design system
- All page components with full UI
- AI Chat integration (Gemini API)
- Mock data for all dashboards
- Complete Django backend scaffolding
- MySQL schema (all 12 tables)
- Full API documentation artifact
- System architecture artifact
- Deployment guide artifact

---

## Proposed Changes

### Frontend — React/Vite (`/FIFA_App/frontend/`)

#### Project Structure
```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/          # Navbar, Footer, Sidebar, etc.
│   │   ├── ai/              # Chat, Voice, Translation
│   │   ├── dashboard/       # Charts, KPIs, Widgets
│   │   ├── crowd/           # Heatmaps, Alerts
│   │   ├── parking/         # Parking Grid, Status
│   │   ├── navigation/      # Maps, Routes
│   │   ├── emergency/       # Alert Panel
│   │   └── volunteer/       # Schedule, Tasks
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── AIAssistant.jsx
│   │   ├── Navigation.jsx
│   │   ├── CrowdDashboard.jsx
│   │   ├── ParkingDashboard.jsx
│   │   ├── TransportDashboard.jsx
│   │   ├── SustainabilityDashboard.jsx
│   │   ├── VolunteerDashboard.jsx
│   │   ├── EmergencyCenter.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── Profile.jsx
│   │   ├── Settings.jsx
│   │   └── Contact.jsx
│   ├── context/             # Auth, Theme, AI Context
│   ├── hooks/               # Custom hooks
│   ├── services/            # API service layer (Axios)
│   ├── utils/               # Helpers, constants
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── vite.config.js
└── package.json
```

### Backend — Django (`/FIFA_App/backend/`)

#### Project Structure
```
backend/
├── manage.py
├── requirements.txt
├── config/
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── apps/
│   ├── authentication/      # JWT auth, RBAC
│   ├── users/               # User management
│   ├── ai_assistant/        # Gemini API integration
│   ├── stadium/             # Matches, venues
│   ├── crowd/               # Crowd analytics
│   ├── parking/             # Parking management
│   ├── transport/           # Transport planning
│   ├── emergency/           # Emergency reports
│   ├── volunteers/          # Volunteer management
│   ├── sustainability/      # Eco metrics
│   └── notifications/       # Push notifications
└── core/
    ├── permissions.py
    ├── middleware.py
    └── utils.py
```

---

## Key Design Decisions

- **Color palette**: Primary `#0A2540`, Secondary `#0066FF`, Accent `#00D4FF`
- **Fonts**: Poppins + Montserrat via Google Fonts
- **AI**: Gemini API for chat, with mock fallback for demo
- **Auth**: JWT with role-based routing (fan, staff, admin, security, volunteer)
- **Charts**: Recharts for dashboards, custom CSS for heatmaps
- **Maps**: SVG-based interactive stadium map (no Google Maps dependency)
- **Animations**: Framer Motion for page transitions and micro-animations

## Verification Plan

- Dev server runs without errors (`npm run dev`)
- All 17 pages route correctly
- AI chat responds (with Gemini key or graceful mock)
- Dashboards render with rich chart data
- Mobile responsive on all breakpoints
- Dark/Light mode toggle works
