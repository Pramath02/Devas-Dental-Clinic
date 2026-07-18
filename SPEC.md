# Devas Dental Clinic — Project Specification

> **Last updated:** 2026-07-18 (cleanup: removed legacy static HTML/JS/CSS)
> **Purpose:** This file is the single source of truth for project structure, architecture, and conventions. Every new chat should start here.

---

## 1. Overview

A dental clinic website for **Devas Dental Clinic** (Gorakhpur, UP). Features a **React SPA frontend** (Vite) with a 3D tooth visualization, and an **Express API backend** (Prisma/PostgreSQL).

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React | 19.2.7 |
| Frontend | Vite | 8.1.5 |
| Routing | react-router-dom | 7.18.1 |
| 3D Graphics | Three.js | via `client/public/js/three.min.js` |
| Backend | Express | 4.21 |
| ORM | Prisma | 6 |
| Database | PostgreSQL (Neon) | — |
| Dev runner | concurrently | 9.1 |
| Dev server | nodemon | 3.1 |

---

## 3. Project Structure

```
/
├── package.json           # Root — runs client + server concurrently
├── .gitignore
├── SPEC.md                # Project specification (this file)
│
├── client/                # React SPA (Vite)
│   ├── package.json
│   ├── vite.config.js     # Proxy /api → localhost:3001
│   ├── index.html         # SPA entry HTML (loads three.min.js from /js/)
│   ├── dist/              # Build output (gitignored)
│   ├── public/
│   │   └── js/
│   │       └── three.min.js   # Three.js library (loaded by index.html)
│   └── src/
│       ├── main.jsx               # Entry: ReactDOM + BrowserRouter
│       ├── App.jsx                # Routes + scroll animation controller
│       ├── styles/style.css       # Full theme (1460 lines)
│       ├── components/
│       │   ├── Header.jsx         # Nav, hamburger, scroll effects, active-link
│       │   ├── Footer.jsx         # 4-column grid, social links, copyright
│       │   ├── ThreeScene.jsx     # 3D tooth (procedural LatheGeometry, particles)
│       │   ├── StatsSection.jsx   # Animated counters (IntersectionObserver)
│       │   └── ScrollAnimations.jsx  # Reusable animation wrapper
│       ├── pages/
│       │   ├── Home.jsx           # Hero, stats, 6 service cards, 3 testimonials, 4 features
│       │   ├── Services.jsx       # 6 detailed service items + CTA
│       │   ├── About.jsx          # Story, 3 values, 5-item timeline, 4 team members
│       │   ├── Contact.jsx        # Form + 4 contact info items + Google Maps
│       │   └── Appointment.jsx    # Booking form (7 fields), steps indicator, info cards
│       ├── hooks/
│       │   └── useScrollReveal.js # IntersectionObserver-based scroll reveal hook
│       └── utils/
│           └── api.js             # Fetch wrapper: submitAppointment, submitContact, healthCheck
│
└── server/                # Express API
    ├── package.json       # ESM, Prisma 6, Express 4
    ├── .env               # DB connection (gitignored)
    ├── .env.example       # Template for DATABASE_URL (Neon PostgreSQL)
    └── src/
        ├── index.js               # App setup: cors, JSON, routes, error handler
        ├── routes/
        │   ├── appointments.js     # POST /api/appointments, GET /api/appointments
        │   └── contact.js          # POST /api/contact
        ├── controllers/
        │   ├── appointmentController.js  # createAppointment + listAppointments
        │   └── contactController.js      # createContactMessage
        ├── middleware/
        │   └── errorHandler.js     # Global 500 handler (dev mode shows details)
        └── prisma/
            └── schema.prisma       # Appointment + ContactMessage models
```

---

## 4. Database Schema

### `Appointment`
| Field | Type | Notes |
|-------|------|-------|
| id | Int (PK, autoincrement) | |
| name | String | Required |
| email | String | Required |
| phone | String | Required |
| date | DateTime | Required |
| time | String? | Optional |
| service | String | Required |
| notes | String? | Optional |
| createdAt | DateTime | Default now() |

### `ContactMessage`
| Field | Type | Notes |
|-------|------|-------|
| id | Int (PK, autoincrement) | |
| name | String | Required |
| email | String | Required |
| subject | String? | Optional |
| message | String | Required |
| createdAt | DateTime | Default now() |

---

## 5. API Endpoints

| Method | Path | Description | Request Body |
|--------|------|-------------|-------------|
| GET | `/api/health` | Health check | — |
| POST | `/api/appointments` | Create appointment | `{ name, email, phone, date, time?, service, message? }` |
| GET | `/api/appointments` | List all appointments | — |
| POST | `/api/contact` | Submit contact message | `{ name, email, subject?, message }` |

---

## 6. Design System

### Color Palette
- **Gold:** `#c8a96e` / `#e8c88a` (light) / `#a8884a` (dark)
- **Teal:** `#2c9e8f` / `#4db8a8` (light) / `#1e7a6e` (dark)
- **Neutrals:** `#faf7f2` (warm-white), `#f5efe4` (cream), `#2c1810` (warm-dark), `#6b5b50` (warm-gray)
- **Background:** `var(--warm-white)` / `var(--cream)` (secondary)

### Typography
- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans-serif)
- **Accent:** Cormorant Garamond (serif)

### Key CSS Variables
```
--max-width: 1200px
--header-height: 80px (70px mobile)
--ease-out: cubic-bezier(0.22, 1, 0.36, 1)
```

### Component Library (all in `client/src/styles/style.css`):
- Buttons (`.btn`, `.btn-primary`, `.btn-outline`, `.btn-gold-outline`)
- Glass cards (`.glass-card`)
- Service cards (`.service-card` + icon)
- Testimonial cards (`.testimonial-card`)
- Stat items (`.stat-item` with animated `.counter`)
- Team cards (`.team-card`)
- Timeline (`.timeline` with alternating layout)
- Form elements (`.form-group`, `.input-icon`, `.form-card`)
- Navigation (`.nav-menu`, `.hamburger`, `.nav-cta`)
- Scroll animations (`[data-animate]`, `.stagger-item`)

---

## 7. Routing (React SPA)

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Hero, stats, services, testimonials, features |
| `/services` | Services | Detailed service list + CTA |
| `/about` | About | Story, values, timeline, team |
| `/contact` | Contact | Form + contact info + map |
| `/appointment` | Appointment | Booking form |

---

## 8. Key Behaviors

### Scroll Animations
- Elements with `[data-animate]` attribute are revealed via IntersectionObserver
- Animation types: `fade-up` (default), `fade-left`, `fade-right`, `scale-in`
- Stagger grids: `.stagger-item` children get sequential delay via `--stagger-index`
- Applied by `useScrollReveal` hook (component) and `useScrollAnimations` in App.jsx

### 3D Tooth Scene (ThreeScene.jsx)
- Procedural tooth using `LatheGeometry` with enamel ring overlay
- Ambient + directional + hemisphere lighting
- 200-particle orbiting system with canvas-generated textures
- Mouse/touch tracking for subtle parallax rotation
- Floating animation on the tooth
- ResizeObserver for responsive canvas

### Stat Counters (StatsSection.jsx)
- Custom `Counter` component with easing
- Triggers on visibility (IntersectionObserver, 50% threshold)
- Animated via `requestAnimationFrame`

### Mobile Navigation (Header.jsx)
- Hamburger icon toggles `.nav-menu.active`
- `body.menu-open` class prevents background scroll
- Closes on route change

### API Client (api.js)
- Generic `request()` fetch wrapper with JSON headers
- Exports: `submitAppointment()`, `submitContact()`, `healthCheck()`
- Base URL: `/api` (Vite proxies to `localhost:3001`)

---

## 9. Development Commands

```bash
npm run dev           # Run both client + server (concurrently)
npm run dev:client    # Vite dev server (port 5173)
npm run dev:server    # Express with nodemon (port 3001)
npm run build         # Vite build into client/dist
npm start             # Run server in production
npm run db:push       # Push Prisma schema to DB
npm run db:studio     # Open Prisma Studio
npm run db:generate   # Generate Prisma client
```

---

## 10. Workflow Rules

### No Subagent (Agent Tool) Usage
**The Agent tool (which spawns subagents) must NEVER be used in this project.**
All work — research, implementation, review, debugging, and deployment — must be done
directly via inline tools (Read, Edit, Write, Bash, etc.). Subagents introduce unnecessary
complexity, cost, and loss of control. If in doubt, do the work yourself rather than delegating.

---

## 11. Deployment Notes

- Static assets build to `client/dist/`
- Server runs as a standalone Node process
- Database: Neon PostgreSQL with Prisma ORM
- CORS is enabled on the server for development
- In production, serve the SPA build via Express static or a reverse proxy