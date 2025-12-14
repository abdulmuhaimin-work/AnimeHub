// ===========================================
// API Configuration
// ===========================================
// Jikan API v4 - Unofficial MyAnimeList API
// Docs: https://docs.api.jikan.moe/

export const API_BASE_URL = 'https://api.jikan.moe/v4';

// Rate limiting: Jikan API allows 3 requests per second
// We add delays between requests to be safe
export const API_RATE_LIMIT_DELAY = 350; // ms between requests

// Default pagination
export const DEFAULT_PAGE_SIZE = 24;

// Stale times for React Query (in milliseconds)
export const STALE_TIMES = {
  animeList: 5 * 60 * 1000,      // 5 minutes
  animeDetail: 10 * 60 * 1000,   // 10 minutes
  genres: 60 * 60 * 1000,        // 1 hour (rarely changes)
} as const;

// API Endpoints
export const ENDPOINTS = {
  anime: `${API_BASE_URL}/anime`,
  animeById: (id: number) => `${API_BASE_URL}/anime/${id}`,
  genres: `${API_BASE_URL}/genres/anime`,
  search: `${API_BASE_URL}/anime`,
} as const;

