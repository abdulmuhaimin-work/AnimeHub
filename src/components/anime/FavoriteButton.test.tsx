import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../../test/test-utils';
import { FavoriteButton } from './FavoriteButton';
import { useFavoritesStore } from '../../store';
import type { Anime } from '../../types/anime';

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

describe('FavoriteButton', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favorites: [] });
  });

  it('should render with "Add to favorites" label when not favorited', () => {
    render(<FavoriteButton anime={mockAnime} />);
    expect(screen.getByRole('button', { name: /add to favorites/i })).toBeInTheDocument();
  });

  it('should toggle favorite when clicked', () => {
    render(<FavoriteButton anime={mockAnime} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(useFavoritesStore.getState().favorites).toHaveLength(1);
    expect(screen.getByRole('button', { name: /remove from favorites/i })).toBeInTheDocument();
  });

  it('should show label when showLabel prop is true', () => {
    render(<FavoriteButton anime={mockAnime} showLabel />);
    expect(screen.getByText('Favorite')).toBeInTheDocument();
  });

  it('should show "Favorited" label when already favorited', () => {
    useFavoritesStore.getState().addFavorite(mockAnime);
    render(<FavoriteButton anime={mockAnime} showLabel />);
    expect(screen.getByText('Favorited')).toBeInTheDocument();
  });

  it('should stop event propagation when clicked', () => {
    const parentClickHandler = vi.fn();
    render(
      <div onClick={parentClickHandler}>
        <FavoriteButton anime={mockAnime} />
      </div>
    );
    
    fireEvent.click(screen.getByRole('button'));
    expect(parentClickHandler).not.toHaveBeenCalled();
  });
});

