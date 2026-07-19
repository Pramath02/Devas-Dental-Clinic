// Vercel serverless function entry point — auto-routed under /api/*
// Thin re-export of the Express app so Vercel can discover it at the standard location
import app from '../server/src/index.js';

export default app;