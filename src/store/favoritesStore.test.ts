import { describe, it, expect, beforeEach } from 'vitest';
import { useFavoritesStore } from './favoritesStore';
import type { Anime } from '../types/anime';

// Mock anime for testing
const mockAnime: Anime = {
  mal_id: 1,
  url: 'https://myanimelist.net/anime/1',
  images: {
    jpg: {
      image_url: 'https://example.com/image.jpg',
      small_image_url: 'https://example.com/image_small.jpg',
      large_image_url: 'https://example.com/image_large.jpg',
    },
    webp: {
      image_url: 'https://example.com/image.webp',
      small_image_url: 'https://example.com/image_small.webp',
      large_image_url: 'https://example.com/image_large.webp',
    },
  },
  trailer: { youtube_id: null, url: null, embed_url: null },
  approved: true,
  titles: [{ type: 'Default', title: 'Test Anime' }],
  title: 'Test Anime',
  title_english: 'Test Anime English',
  title_japanese: 'テストアニメ',
  type: 'TV',
  source: 'Manga',
  episodes: 24,
  status: 'Finished Airing',
  airing: false,
  aired: { from: '2020-01-01', to: '2020-06-01', string: 'Jan 2020 to Jun 2020' },
  duration: '24 min per ep',
  rating: 'PG-13',
  score: 8.5,
  scored_by: 100000,
  rank: 100,
  popularity: 50,
  members: 500000,
  favorites: 10000,
  synopsis: 'A test anime synopsis',
  background: null,
  season: 'winter',
  year: 2020,
  genres: [{ mal_id: 1, type: 'anime', name: 'Action', url: '' }],
  studios: [{ mal_id: 1, type: 'anime', name: 'Test Studio', url: '' }],
};

describe('favoritesStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    useFavoritesStore.setState({ favorites: [] });
  });

  it('should start with empty favorites', () => {
    const { favorites } = useFavoritesStore.getState();
    expect(favorites).toEqual([]);
  });

  it('should add anime to favorites', () => {
    const { addFavorite } = useFavoritesStore.getState();
    addFavorite(mockAnime);

    const { favorites } = useFavoritesStore.getState();
    expect(favorites).toHaveLength(1);
    expect(favorites[0].mal_id).toBe(1);
    expect(favorites[0].title).toBe('Test Anime');
  });

  it('should remove anime from favorites', () => {
    const { addFavorite, removeFavorite } = useFavoritesStore.getState();
    addFavorite(mockAnime);
    removeFavorite(1);

    const { favorites } = useFavoritesStore.getState();
    expect(favorites).toHaveLength(0);
  });

  it('should check if anime is favorite', () => {
    const { addFavorite, isFavorite } = useFavoritesStore.getState();
    
    expect(isFavorite(1)).toBe(false);
    
    addFavorite(mockAnime);
    expect(useFavoritesStore.getState().isFavorite(1)).toBe(true);
  });

  it('should toggle favorite', () => {
    const store = useFavoritesStore.getState();
    
    // Add
    store.toggleFavorite(mockAnime);
    expect(useFavoritesStore.getState().favorites).toHaveLength(1);
    
    // Remove
    useFavoritesStore.getState().toggleFavorite(mockAnime);
    expect(useFavoritesStore.getState().favorites).toHaveLength(0);
  });

  it('should clear all favorites', () => {
    const { addFavorite, clearFavorites } = useFavoritesStore.getState();
    
    addFavorite(mockAnime);
    addFavorite({ ...mockAnime, mal_id: 2, title: 'Test Anime 2' });
    
    expect(useFavoritesStore.getState().favorites).toHaveLength(2);
    
    clearFavorites();
    expect(useFavoritesStore.getState().favorites).toHaveLength(0);
  });

  it('should add favorites at the beginning of the list', () => {
    const { addFavorite } = useFavoritesStore.getState();
    
    addFavorite(mockAnime);
    addFavorite({ ...mockAnime, mal_id: 2, title: 'Test Anime 2' });
    
    const { favorites } = useFavoritesStore.getState();
    expect(favorites[0].mal_id).toBe(2);
    expect(favorites[1].mal_id).toBe(1);
  });
});

