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

// Routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/contact', contactRoutes);

// Error handler
app.use(errorHandler);

// Export for Vercel serverless functions
export default app;

// Only start server if not in serverless environment
if (process.env.VERCEL === 'true' || process.env.NODE_ENV === 'development') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}