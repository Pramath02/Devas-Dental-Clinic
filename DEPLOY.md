# Deploying Devas Dental Clinic to Vercel

## Option A: Monorepo (Recommended)

Deploy frontend and API in a single Vercel project.

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
vercel
```

Vercel will auto-detect:
- **Frontend**: `client/` → static site (React/Vite)
- **Backend**: `server/src/index.js` → Node.js Serverless Functions

### Step 3: Set Environment Variables
In Vercel Dashboard → Project Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your Neon connection string |
| `NODE_ENV` | `production` |

---

## Option B: Two Separate Projects

Use this if you want more control.

### Frontend Project
1. Create new Vercel project
2. Framework: "React" 
3. Root Directory: `/client`
4. Build Command: `npm run build`
5. Output Directory: `dist`

### Backend Project
1. Create new Vercel project  
2. Framework: "Other"
3. Root Directory: `/server`
4. Server: Node.js

### Step 3: Configure Environment
Add `DATABASE_URL` to both projects.

In frontend `.env`:
```
VITE_API_BASE=https://your-backend.vercel.app/api
```

---

## Database Setup

1. Create/update your Neon PostgreSQL database at https://console.neon.tech
2. Copy the connection string
3. Add to Vercel as `DATABASE_URL` environment variable

---

## Project Structure

```
/ (Vercel detects this root)
├── client/          → Static build (React/Vite)
├── server/          → Serverless API (Express/Prisma)
└── vercel.json      → Vercel configuration
```

---

## Build Output

After deployment:
- **Frontend**: https://your-project.vercel.app
- **API**: https://your-project.vercel.app/api/...