import express from 'express';
import cors from 'cors';
import appointmentRoutes from './routes/appointments.js';
import contactRoutes from './routes/contact.js';

const app = express();

// CORS - Vercel serverless needs open CORS
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// Health check - Vercel routes /api/health here
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), platform: 'vercel' });
});

// API Routes - Mail for /api/appointments and /api/contact from Vercel routing
app.use('/api/appointments', appointmentRoutes);
app.use('/api/contact', contactRoutes);

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