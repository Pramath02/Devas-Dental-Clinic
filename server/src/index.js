import express from 'express';
import cors from 'cors';
import appointmentRoutes from './routes/appointments.js';
import contactRoutes from './routes/contact.js';

const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes - Vercel will route /api/* to this server
app.use('/api', appointmentRoutes);
app.use('/api', contactRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Not found', path: req.path });
});

export default app;

// Only start server in local dev (Vercel sets VERCEL env)
if (!process.env.VERCEL) {
  app.listen(process.env.PORT || 3001, () => {
    console.log('Server running');
  });
}