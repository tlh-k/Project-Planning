/**
 * Gold API Routes
 * Provides endpoints for fetching gold prices.
 */
import { Router } from 'express';
import { fetchGoldPrices, clearCache } from '../services/goldService.js';

const router = Router();

/**
 * GET /api/gold-prices
 * Returns all gold prices with metadata
 */
router.get('/gold-prices', async (req, res) => {
  try {
    const data = await fetchGoldPrices();
    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Error fetching gold prices:', error);
    res.status(503).json({
      success: false,
      error: 'Altın fiyatları şu anda alınamıyor. Lütfen daha sonra tekrar deneyin.',
    });
  }
});

/**
 * POST /api/gold-prices/refresh
 * Forces a cache refresh
 */
router.post('/gold-prices/refresh', async (req, res) => {
  try {
    clearCache();
    const data = await fetchGoldPrices();
    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Error refreshing gold prices:', error);
    res.status(503).json({
      success: false,
      error: 'Fiyatlar yenilenemedi.',
    });
  }
});

export default router;
