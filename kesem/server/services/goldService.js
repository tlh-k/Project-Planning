/**
 * Gold Price Service
 * Fetches gold prices from Truncgil Finance API with in-memory caching.
 * API: https://finans.truncgil.com/today.json (free, no key required)
 */

const API_URL = 'https://finans.truncgil.com/today.json';
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

// Gold types we care about (filtered from full API response)
const GOLD_KEYS = [
  'gram-altin',
  'ceyrek-altin',
  'yarim-altin',
  'tam-altin',
  'cumhuriyet-altini',
  'resat-altin',
  'ata-altin',
  'hamit-altin',
  '22-ayar-bilezik',
  '14-ayar-altin',
  '18-ayar-altin',
  'ikibucuk-altin',
  'besli-altin',
  'gremse-altin',
  'gumus',
];

// In-memory cache
let cache = {
  data: null,
  timestamp: 0,
};

/**
 * Parse Turkish number format "6.276,76" → 6276.76
 */
function parseTurkishNumber(str) {
  if (!str || typeof str !== 'string') return 0;
  // Remove currency symbols like $
  const cleaned = str.replace(/[^0-9.,]/g, '');
  // Turkish format: dots are thousands separator, comma is decimal
  return parseFloat(cleaned.replace(/\./g, '').replace(',', '.')) || 0;
}

/**
 * Fetch and cache gold prices from Truncgil API
 */
async function fetchGoldPrices() {
  const now = Date.now();

  // Return cached data if still fresh
  if (cache.data && now - cache.timestamp < CACHE_DURATION_MS) {
    return { ...cache.data, cached: true };
  }

  try {
    const response = await fetch(API_URL, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'KESEM-Gold-Calculator/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const rawData = await response.json();

    // Extract update date
    const updateDate = rawData.Update_Date || new Date().toISOString();

    // Filter and transform gold data
    const goldPrices = {};
    for (const key of GOLD_KEYS) {
      if (rawData[key]) {
        const item = rawData[key];
        goldPrices[key] = {
          pilesName: key,
          buyPrice: parseTurkishNumber(item['Alış']),
          sellPrice: parseTurkishNumber(item['Satış']),
          changePercent: item['Değişim'] || '%0',
          buyPriceRaw: item['Alış'],
          sellPriceRaw: item['Satış'],
        };
      }
    }

    const result = {
      updateDate,
      goldPrices,
      cached: false,
    };

    // Update cache
    cache = {
      data: result,
      timestamp: now,
    };

    return result;
  } catch (error) {
    // If we have stale cache, return it as fallback
    if (cache.data) {
      console.warn('API fetch failed, returning stale cache:', error.message);
      return { ...cache.data, cached: true, stale: true };
    }
    throw error;
  }
}

/**
 * Clear the cache (useful for forcing a refresh)
 */
function clearCache() {
  cache = { data: null, timestamp: 0 };
}

export { fetchGoldPrices, clearCache, parseTurkishNumber };
