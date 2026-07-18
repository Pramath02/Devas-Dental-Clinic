import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import appointmentRoutes from './routes/appointments.js';
import contactRoutes from './routes/contact.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

// Health check endpoint - match with or without /api prefix
app.get(['/health', '/api/health'], (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Route endpoints - match with or without /api prefix
app.use(['/appointments', '/api/appointments'], appointmentRoutes);
app.use(['/contact', '/api/contact'], contactRoutes);

// Error handler - must be after routes
app.use(errorHandler);

// 404 handler for unmatched routes
app.use('*', (req, res) => {
  console.log('404 for path:', req.path);
  res.status(404).json({ error: 'Not found' });
});

// Export for Vercel serverless functions
export default app;

// Only start server if not in serverless environment
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}