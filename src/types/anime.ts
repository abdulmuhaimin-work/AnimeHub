// Jikan API Types
// API Documentation: https://docs.api.jikan.moe/

export interface AnimeImage {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface AnimeImages {
  jpg: AnimeImage;
  webp: AnimeImage;
}

export interface AnimeTitle {
  type: string;
  title: string;
}

export interface AnimeAired {
  from: string | null;
  to: string | null;
  string: string;
}

export interface AnimeGenre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface AnimeStudio {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface AnimeTrailer {
  youtube_id: string | null;
  url: string | null;
  embed_url: string | null;
}

export interface Anime {
  mal_id: number;
  url: string;
  images: AnimeImages;
  trailer: AnimeTrailer;
  approved: boolean;
  titles: AnimeTitle[];
  title: string;
  title_english: string | null;
  title_japanese: string | null;
  type: string | null;
  source: string;
  episodes: number | null;
  status: string;
  airing: boolean;
  aired: AnimeAired;
  duration: string;
  rating: string | null;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number | null;
  members: number;
  favorites: number;
  synopsis: string | null;
  background: string | null;
  season: string | null;
  year: number | null;
  genres: AnimeGenre[];
  studios: AnimeStudio[];
}

export interface AnimePagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface AnimeListResponse {
  pagination: AnimePagination;
  data: Anime[];
}

export interface AnimeDetailResponse {
  data: Anime;
}

export interface GenreListResponse {
  data: AnimeGenre[];
}

// App-specific types
export interface AnimeFilters {
  q?: string;
  genres?: string;
  order_by?: 'score' | 'popularity' | 'rank' | 'title';
  sort?: 'asc' | 'desc';
  status?: 'airing' | 'complete' | 'upcoming';
  rating?: 'g' | 'pg' | 'pg13' | 'r17' | 'r' | 'rx';
}

export interface FavoriteAnime {
  mal_id: number;
  title: string;
  image_url: string;
  score: number | null;
  episodes: number | null;
  type: string | null;
  addedAt: number;
}

