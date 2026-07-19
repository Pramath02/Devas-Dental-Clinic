import express from 'express';
import cors from 'cors';
import appointmentRoutes from './routes/appointments.js';
import contactRoutes from './routes/contact.js';

const app = express();

// CORS - Vercel serverless needs open CORS
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// Middleware to normalize routes for both Vercel (strips /api) and Vite (preserves /api)
const apiPathRewriter = (req, res, next) => {
  // If request path starts with /api, strip it to normalize for Vercel
  // Vercel routes strip /api prefix, Vite proxy preserves it
  if (req.path.startsWith('/api/') || req.path === '/api') {
    req.url = req.url.replace(/^\/api/, '') || '/';
  }
  next();
};

app.use(apiPathRewriter);

// Health check - Vercel routes /api/health here
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), platform: 'vercel' });
});

// API Routes - mount at path-specific points so sub-router handlers match
app.use('/appointments', appointmentRoutes);
app.use('/contact', contactRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  console.log('404 - Method:', req.method, 'Path:', req.path);
  res.status(404).json({ error: 'Not found', path: req.path });
});

export default app;

// Only listen in local development (Vercel has VERCEL env)
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}