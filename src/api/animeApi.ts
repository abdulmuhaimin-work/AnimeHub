import apiClient from './client';
import { ENDPOINTS, DEFAULT_PAGE_SIZE } from './config';
import type { 
  AnimeListResponse, 
  AnimeDetailResponse, 
  GenreListResponse,
  AnimeFilters 
} from '../types/anime';

export interface FetchAnimeListParams extends AnimeFilters {
  page?: number;
  limit?: number;
}

/**
 * Fetch paginated list of anime
 */
export async function fetchAnimeList(
  params: FetchAnimeListParams = {}
): Promise<AnimeListResponse> {
  const { page = 1, limit = DEFAULT_PAGE_SIZE, ...filters } = params;
  
  const response = await apiClient.get<AnimeListResponse>(ENDPOINTS.anime, {
    params: {
      page,
      limit,
      sfw: true, // Safe for work filter
      ...filters,
    },
  });
  
  return response.data;
}

/**
 * Fetch anime details by ID
 */
export async function fetchAnimeById(id: number): Promise<AnimeDetailResponse> {
  const response = await apiClient.get<AnimeDetailResponse>(ENDPOINTS.animeById(id));
  return response.data;
}

/**
 * Fetch all anime genres
 */
export async function fetchGenres(): Promise<GenreListResponse> {
  const response = await apiClient.get<GenreListResponse>(ENDPOINTS.genres);
  return response.data;
}

/**
 * Search anime by title
 */
export async function searchAnime(
  query: string,
  params: Omit<FetchAnimeListParams, 'q'> = {}
): Promise<AnimeListResponse> {
  return fetchAnimeList({ ...params, q: query });
}

