import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import appointmentRoutes from './routes/appointments.js';
import contactRoutes from './routes/contact.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes - with /api prefix for Vercel routing
app.use('/api/appointments', appointmentRoutes);
app.use('/api/contact', contactRoutes);

// Error handler - must be after routes
app.use(errorHandler);

// 404 handler for unmatched routes
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Export for Vercel serverless functions
export default app;

// Only start server if not in serverless environment (Vercel sets VERCEL env)
if (!process.env.VERCEL && !process.env.HEADLESS) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}