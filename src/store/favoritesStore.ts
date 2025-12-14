import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FavoriteAnime, Anime } from '../types/anime';

interface FavoritesState {
  favorites: FavoriteAnime[];
  addFavorite: (anime: Anime) => void;
  removeFavorite: (malId: number) => void;
  isFavorite: (malId: number) => boolean;
  toggleFavorite: (anime: Anime) => void;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (anime: Anime) => {
        const favorite: FavoriteAnime = {
          mal_id: anime.mal_id,
          title: anime.title,
          image_url: anime.images.jpg.large_image_url || anime.images.jpg.image_url,
          score: anime.score,
          episodes: anime.episodes,
          type: anime.type,
          addedAt: Date.now(),
        };

        set((state) => ({
          favorites: [favorite, ...state.favorites],
        }));
      },

      removeFavorite: (malId: number) => {
        set((state) => ({
          favorites: state.favorites.filter((f) => f.mal_id !== malId),
        }));
      },

      isFavorite: (malId: number) => {
        return get().favorites.some((f) => f.mal_id === malId);
      },

      toggleFavorite: (anime: Anime) => {
        const { isFavorite, addFavorite, removeFavorite } = get();
        if (isFavorite(anime.mal_id)) {
          removeFavorite(anime.mal_id);
        } else {
          addFavorite(anime);
        }
      },

      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: 'anime-favorites',
    }
  )
);

