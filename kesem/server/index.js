/**
 * KESEM Gold Calculator — Backend Server
 * Express API server that proxies and caches gold prices from Truncgil Finance API.
 */
import express from 'express';
import cors from 'cors';
import goldRoutes from './routes/gold.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:4173',
    'http://127.0.0.1:5173',
  ],
}));
app.use(express.json());

// Routes
app.use('/api', goldRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'kesem-api', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n  🪙  KESEM API Server`);
  console.log(`  ─────────────────────`);
  console.log(`  📡  http://localhost:${PORT}`);
  console.log(`  🔄  Gold prices: http://localhost:${PORT}/api/gold-prices`);
  console.log(`  💚  Health: http://localhost:${PORT}/health\n`);
});
