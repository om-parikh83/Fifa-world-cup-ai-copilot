# Django REST API Documentation: FIFA AI Smart Stadium Copilot

This document defines the complete RESTful API contract for the **FIFA AI Smart Stadium Copilot** backend. All endpoints respond with JSON payloads and use standard HTTP status codes.

---

## Global API Configuration

- **Base URL**: `https://api.fifa-copilot.worldcup.org/api/v1`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <jwt_access_token>` (for authenticated endpoints)

---

## 1. Authentication Service (`/auth`)

### `POST /auth/register`
Creates a new user profile (default role: `fan`).

- **Request Payload**:
  ```json
  {
    "email": "fan.user@example.com",
    "password": "SecurePassword123!",
    "name": "Sarah Johnson",
    "preferred_language": "en"
  }
  ```
- **Success Response (`201 Created`)**:
  ```json
  {
    "status": "success",
    "message": "User registered successfully.",
    "user": {
      "user_id": 42,
      "email": "fan.user@example.com",
      "name": "Sarah Johnson",
      "role": "fan"
    }
  }
  ```

### `POST /auth/login`
Authenticates user credentials and generates JWT keys.

- **Request Payload**:
  ```json
  {
    "email": "fan.user@example.com",
    "password": "SecurePassword123!"
  }
  ```
- **Success Response (`200 OK`)**:
  ```json
  {
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "user_id": 42,
      "email": "fan.user@example.com",
      "name": "Sarah Johnson",
      "role": "fan",
      "avatar": "👤"
    }
  }
  ```

---

## 2. User Profile Service (`/users`)

### `GET /users/profile`
Retrieves authenticated user profile details.

- **Success Response (`200 OK`)**:
  ```json
  {
    "user_id": 42,
    "email": "fan.user@example.com",
    "name": "Sarah Johnson",
    "preferred_language": "en",
    "role": "fan",
    "avatar": "👤"
  }
  ```

### `PUT /users/profile`
Modifies user settings or profile metrics.

- **Request Payload**:
  ```json
  {
    "name": "Sarah Johnson-Smith",
    "preferred_language": "es"
  }
  ```
- **Success Response (`200 OK`)**:
  ```json
  {
    "status": "success",
    "user": {
      "user_id": 42,
      "name": "Sarah Johnson-Smith",
      "preferred_language": "es",
      "role": "fan"
    }
  }
  ```

---

## 3. AI Assistant Service (`/ai`)

### `POST /ai/chat`
Sends user prompt (text/voice transcript) to the Gemini AI core.

- **Request Payload**:
  ```json
  {
    "message": "Where is my seat in Sector C, Row 14?",
    "stadium_id": 1,
    "language_code": "en"
  }
  ```
- **Success Response (`200 OK`)**:
  ```json
  {
    "response": "Your seat is located in SoFi Stadium's lower bowl. To get there, enter through Gate A, take the escalator to Level 2, and walk down Concourse C. Sector C is immediately on your right.",
    "chat_id": 104,
    "action_required": "show_navigation_map",
    "navigation_details": {
      "target_sector": "Sector C",
      "recommended_gate": "Gate A"
    }
  }
  ```

### `POST /ai/translate`
Performs real-time emergency speech/text translations.

- **Request Payload**:
  ```json
  {
    "text": "Please remain seated, a medical team is on their way.",
    "target_language": "es"
  }
  ```
- **Success Response (`200 OK`)**:
  ```json
  {
    "translated_text": "Por favor, permanezcan sentados, un equipo médico está en camino."
  }
  ```

---

## 4. Navigation & Stadium Operations (`/navigation`, `/stadium`)

### `GET /navigation/route`
Calculates optimal paths, supporting accessibility configurations.

- **Request Parameters**:
  - `stadium_id` = `1`
  - `start` = `Gate A`
  - `destination` = `Sector C`
  - `accessible_only` = `true` (Wheelchair routing)
- **Success Response (`200 OK`)**:
  ```json
  {
    "stadium_id": 1,
    "accessible_only": true,
    "route_steps": [
      { "instruction": "Enter through Gate A ramp", "distance_meters": 15 },
      { "instruction": "Take Elevators 2A to Level 2", "distance_meters": 30 },
      { "instruction": "Proceed along wheelchair-accessible concourse towards Sector C", "distance_meters": 45 }
    ],
    "total_distance_meters": 90,
    "estimated_time_seconds": 180,
    "emergency_evacuation": false
  }
  ```

---

## 5. Crowd Intelligence Service (`/crowd`)

### `GET /crowd/analytics`
Fetches real-time gate statuses, queue predictions, and sensor data.

- **Success Response (`200 OK`)**:
  ```json
  {
    "stadium_id": 1,
    "recorded_at": "2026-07-09T03:30:00Z",
    "overall_crowd_status": "heavy",
    "zones": [
      { "zone": "Gate 5", "density_pct": 85.5, "wait_minutes": 25, "status": "heavy" },
      { "zone": "Gate 7", "density_pct": 32.0, "wait_minutes": 5, "status": "normal" },
      { "zone": "Gate 9", "density_pct": 28.5, "wait_minutes": 3, "status": "normal" }
    ],
    "recommendation": "Divert arriving fans at Gate 5 to Gate 7 and 9 immediately."
  }
  ```

---

## 6. Smart Parking Service (`/parking`)

### `GET /parking/availability`
Retrieves parking statuses, pricing, and active occupancy rates.

- **Success Response (`200 OK`)**:
  ```json
  {
    "stadium_id": 1,
    "zones": [
      { "zone": "Zone P-B3", "total": 300, "occupied": 53, "reserved": 10, "status": "available" },
      { "zone": "Zone P-A1", "total": 500, "occupied": 482, "reserved": 15, "status": "full" }
    ]
  }
  ```

---

## 7. Smart Transportation Service (`/transport`)

### `GET /transport/schedule`
Provides real-time train, bus, and ride-share options.

- **Success Response (`200 OK`)**:
  ```json
  {
    "stadium_id": 1,
    "transit_options": [
      { "mode": "Metro", "line": "Metro Line 2", "status": "delayed", "delay_minutes": 12, "reason": "Signal issue" },
      { "mode": "Shuttle Bus", "line": "Line A-Express", "status": "active", "delay_minutes": 0 }
    ]
  }
  ```

---

## 8. Emergency Reporting & Incident Service (`/emergency`)

### `POST /emergency/report`
Submits active medical, hazard, or security alerts.

- **Request Payload**:
  ```json
  {
    "stadium_id": 1,
    "type": "medical",
    "description": "Fan has fainted in Sector C, Row 14",
    "location_details": "Row 14 Seat 12",
    "priority": "critical"
  }
  ```
- **Success Response (`201 Created`)**:
  ```json
  {
    "report_id": 309,
    "status": "reported",
    "assigned_responder": null,
    "created_at": "2026-07-09T03:35:00Z"
  }
  ```

---

## 9. Volunteer Management Service (`/volunteers`)

### `GET /volunteers/shifts`
(Restricted to roles: `volunteer`, `staff`, `admin`) Retrieves active shifts and tasks.

- **Success Response (`200 OK`)**:
  ```json
  {
    "volunteer_id": 12,
    "assigned_sector": "Sector C Info Booth",
    "shift_start": "2026-07-09T12:00:00Z",
    "shift_end": "2026-07-09T18:00:00Z",
    "tasks": [
      { "id": 1, "description": "Assist arriving VIP delegation at Gate A", "completed": false },
      { "id": 2, "description": "Conduct sign-language assistance checklist", "completed": true }
    ]
  }
  ```

---

## 10. Notifications & Alerts (`/notifications`)

### `GET /notifications`
Retrieves pending notifications and real-time alerts.

- **Success Response (`200 OK`)**:
  ```json
  [
    {
      "notification_id": 1089,
      "title": "Gate 5 Delay Alert",
      "message": "Gate 5 queue exceeds 25 minutes. Proceed to Gate 7 for faster entrance.",
      "type": "warning",
      "is_read": false,
      "created_at": "2026-07-09T03:34:00Z"
    }
  ]
  ```
