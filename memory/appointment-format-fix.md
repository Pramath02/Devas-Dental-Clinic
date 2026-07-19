---
name: appointment-format-fix
description: Date and time formatting for appointment API
metadata:
  type: project
---

Added validation and formatting for appointment date/time to ensure:
- Date is in YYYY-MM-DD format (e.g., "2026-07-21")
- Time is in HH:MM 24-hour format (e.g., "21:00")

Also fixed Vercel routing by adding a middleware that normalizes `/api` path prefixes for both Vercel (strips prefix) and Vite (preserves prefix) environments.

**Files modified:**
- server/src/controllers/appointmentController.js - date/time validation and formatting
- server/src/index.js - Vercel routing middleware

**Key regex patterns:**
- Date: `^(\d{4}-\d{2}-\d{2})` extracts YYYY-MM-DD
- Time: `^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$` validates HH:MM

**Why:** The original code had routing issues where Vercel strips the `/api` prefix from routes, causing API endpoints to be unreachable in production.