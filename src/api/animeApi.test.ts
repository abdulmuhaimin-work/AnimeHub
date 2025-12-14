import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchAnimeList, fetchAnimeById, fetchGenres, searchAnime } from './animeApi';
import apiClient from './client';

// Mock the API client
vi.mock('./client', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('animeApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('fetchAnimeList', () => {
    it('should fetch anime list with default parameters', async () => {
      const mockResponse = {
        data: {
          pagination: { last_visible_page: 1, has_next_page: false, current_page: 1 },
          data: [{ mal_id: 1, title: 'Test Anime' }],
        },
      };

      vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse);

      const result = await fetchAnimeList();

      expect(apiClient.get).toHaveBeenCalledWith(
        'https://api.jikan.moe/v4/anime',
        expect.objectContaining({
          params: expect.objectContaining({
            page: 1,
            limit: 24,
            sfw: true,
          }),
        })
      );
      expect(result).toEqual(mockResponse.data);
    });

    it('should fetch anime list with custom parameters', async () => {
      const mockResponse = { data: { pagination: {}, data: [] } };
      vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse);

      await fetchAnimeList({ page: 2, limit: 10, q: 'naruto' });

      expect(apiClient.get).toHaveBeenCalledWith(
        'https://api.jikan.moe/v4/anime',
        expect.objectContaining({
          params: expect.objectContaining({
            page: 2,
            limit: 10,
            q: 'naruto',
            sfw: true,
          }),
        })
      );
    });
  });

  describe('fetchAnimeById', () => {
    it('should fetch anime by ID', async () => {
      const mockResponse = {
        data: { data: { mal_id: 1, title: 'Test Anime' } },
      };

      vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse);

      const result = await fetchAnimeById(1);

      expect(apiClient.get).toHaveBeenCalledWith('https://api.jikan.moe/v4/anime/1');
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('fetchGenres', () => {
    it('should fetch all genres', async () => {
      const mockResponse = {
        data: { data: [{ mal_id: 1, name: 'Action' }] },
      };

      vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse);

      const result = await fetchGenres();

      expect(apiClient.get).toHaveBeenCalledWith('https://api.jikan.moe/v4/genres/anime');
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('searchAnime', () => {
    it('should search anime by title', async () => {
      const mockResponse = { data: { pagination: {}, data: [] } };
      vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse);

      await searchAnime('naruto');

      expect(apiClient.get).toHaveBeenCalledWith(
        'https://api.jikan.moe/v4/anime',
        expect.objectContaining({
          params: expect.objectContaining({
            q: 'naruto',
          }),
        })
      );
    });
  });
});

