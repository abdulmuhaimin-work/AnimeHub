import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, Play, Tv, Trash2, ArrowRight } from 'lucide-react';
import { useFavoritesStore } from '../../store';
import { PageContainer } from '../../components/layout/PageContainer';
import { Button } from '../../components/ui/Button';

export function FavoritesPage() {
  const { favorites, removeFavorite, clearFavorites } = useFavoritesStore();

  if (favorites.length === 0) {
    return (
      <PageContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-dark-800 flex items-center justify-center">
            <Heart className="w-12 h-12 text-dark-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">No Favorites Yet</h1>
          <p className="text-dark-300 mb-8 max-w-md mx-auto">
            Start exploring and add some anime to your favorites! They'll appear here for easy access.
          </p>
          <Link to="/">
            <Button rightIcon={<ArrowRight size={18} />}>
              Browse Anime
            </Button>
          </Link>
        </motion.div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <Heart className="text-accent-400" fill="currentColor" />
            My Favorites
          </h1>
          <p className="text-dark-300 mt-2">
            {favorites.length} anime{favorites.length !== 1 ? 's' : ''} saved
          </p>
        </div>

        <Button
          variant="danger"
          onClick={() => {
            if (confirm('Are you sure you want to remove all favorites?')) {
              clearFavorites();
            }
          }}
          leftIcon={<Trash2 size={18} />}
        >
          Clear All
        </Button>
      </motion.div>

      {/* Favorites Grid */}
      <div className="space-y-4">
        {favorites.map((anime, index) => (
          <motion.div
            key={anime.mal_id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="card group"
          >
            <Link 
              to={`/anime/${anime.mal_id}`}
              className="flex gap-4 p-4"
            >
              {/* Image */}
              <div className="flex-shrink-0 w-24 md:w-32 aspect-[3/4] rounded-lg overflow-hidden bg-dark-700">
                <img
                  src={anime.image_url}
                  alt={anime.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 flex flex-col">
                <h3 className="font-semibold text-lg text-white group-hover:text-primary-400 transition-colors line-clamp-2">
                  {anime.title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 mt-2">
                  {anime.score && (
                    <div className="flex items-center gap-1 text-sm">
                      <Star size={14} className="text-yellow-400" fill="currentColor" />
                      <span className="text-white font-medium">{anime.score}</span>
                    </div>
                  )}

                  {anime.type && (
                    <div className="flex items-center gap-1 text-sm text-dark-300">
                      <Tv size={14} />
                      <span>{anime.type}</span>
                    </div>
                  )}

                  {anime.episodes && (
                    <div className="flex items-center gap-1 text-sm text-dark-300">
                      <Play size={14} />
                      <span>{anime.episodes} episodes</span>
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-3">
                  <p className="text-xs text-dark-400">
                    Added {new Date(anime.addedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Remove Button */}
              <div className="flex-shrink-0 flex items-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFavorite(anime.mal_id);
                  }}
                  className="p-2 rounded-lg text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  aria-label="Remove from favorites"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </PageContainer>
  );
}

