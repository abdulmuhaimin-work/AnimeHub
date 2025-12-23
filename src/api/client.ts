import axios from 'axios';
import type { AxiosError } from 'axios';
import { API_BASE_URL, API_RATE_LIMIT_DELAY } from './config';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request queue for rate limiting
let lastRequestTime = 0;

// Request interceptor for rate limiting
apiClient.interceptors.request.use(async (config) => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < API_RATE_LIMIT_DELAY) {
    await new Promise(resolve => 
      setTimeout(resolve, API_RATE_LIMIT_DELAY - timeSinceLastRequest)
    );
  }
  
  lastRequestTime = Date.now();
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 429) {
      // Rate limited - wait and retry
      console.warn('Rate limited by Jikan API, waiting before retry...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return apiClient.request(error.config!);
    }
    
    // Transform error for consistent handling
    const message = getErrorMessage(error);
    return Promise.reject(new Error(message));
  }
);

function getErrorMessage(error: AxiosError): string {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        return 'Invalid request. Please check your search parameters.';
      case 404:
        return 'Anime not found.';
      case 429:
        return 'Too many requests. Please wait a moment.';
      case 500:
      case 502:
      case 503:
        return 'Server error. Please try again later.';
      default:
        return 'An unexpected error occurred.';
    }
  }
  
  if (error.request) {
    return 'Network error. Please check your connection.';
  }
  
  // Don't expose raw error messages to users
  // Log technical details to console for debugging
  console.error('API Error:', error.message);
  return 'An unexpected error occurred. Please try again later.';
}

export default apiClient;

