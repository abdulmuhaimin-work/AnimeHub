import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, Play, Tv, Trash2, ArrowRight, Bookmark } from 'lucide-react';
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
          <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-surface-100 
                         flex items-center justify-center border-2 border-surface-200">
            <Bookmark className="w-12 h-12 text-surface-400" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-display font-bold text-surface-800 mb-3">
            No Favorites Yet
          </h1>
          
          <p className="text-surface-600 mb-8 max-w-md mx-auto">
            Start exploring and save anime to your collection. Your favorites will appear here.
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
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-100 to-accent-200 
                         flex items-center justify-center border-2 border-accent-200">
            <Heart className="text-accent-500" size={28} fill="currentColor" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-surface-800">
              My Favorites
            </h1>
            <p className="text-surface-500 text-sm">
              {favorites.length} anime{favorites.length !== 1 ? 's' : ''} saved
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          onClick={() => {
            if (confirm('Remove all favorites?')) {
              clearFavorites();
            }
          }}
          leftIcon={<Trash2 size={18} />}
          className="text-surface-600 hover:text-red-500 hover:bg-red-50"
        >
          Clear All
        </Button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
      >
        {[
          { label: 'Total', value: favorites.length, bg: 'from-accent-50 to-accent-100', border: 'border-accent-200', text: 'text-accent-600' },
          { label: 'Top Rated', value: favorites.filter(f => f.score && f.score >= 8).length, bg: 'from-yellow-50 to-yellow-100', border: 'border-yellow-200', text: 'text-yellow-600' },
          { label: 'TV Series', value: favorites.filter(f => f.type === 'TV').length, bg: 'from-primary-50 to-primary-100', border: 'border-primary-200', text: 'text-primary-600' },
          { label: 'Movies', value: favorites.filter(f => f.type === 'Movie').length, bg: 'from-emerald-50 to-emerald-100', border: 'border-emerald-200', text: 'text-emerald-600' },
        ].map((stat, i) => (
          <div key={i} className={`bg-gradient-to-br ${stat.bg} rounded-2xl p-4 border-2 ${stat.border}`}>
            <div className={`text-2xl font-bold ${stat.text}`}>
              {stat.value}
            </div>
            <div className="text-surface-600 text-sm font-medium">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Favorites List */}
      <div className="space-y-3">
        {favorites.map((anime, index) => (
          <motion.div
            key={anime.mal_id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            className="card group hover:border-accent-200 transition-all duration-300"
          >
            <Link 
              to={`/anime/${anime.mal_id}`}
              className="flex gap-4 p-4"
            >
              {/* Image */}
              <div className="flex-shrink-0 w-20 md:w-28 aspect-[3/4] rounded-2xl overflow-hidden bg-surface-100">
                <img
                  src={anime.image_url}
                  alt={anime.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                <div>
                  <h3 className="font-bold text-lg text-surface-800 group-hover:text-accent-600 transition-colors line-clamp-2 mb-2">
                    {anime.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3">
                    {anime.score && (
                      <div className="flex items-center gap-1.5 text-sm">
                        <Star size={14} className="text-yellow-500" fill="currentColor" />
                        <span className="text-surface-800 font-semibold">{anime.score}</span>
                      </div>
                    )}

                    {anime.type && (
                      <div className="flex items-center gap-1.5 text-sm text-surface-600">
                        <Tv size={14} />
                        <span>{anime.type}</span>
                      </div>
                    )}

                    {anime.episodes && (
                      <div className="flex items-center gap-1.5 text-sm text-surface-600">
                        <Play size={14} />
                        <span>{anime.episodes} eps</span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-xs text-surface-400 mt-2">
                  Added {new Date(anime.addedAt).toLocaleDateString()}
                </p>
              </div>

              {/* Remove Button */}
              <div className="flex-shrink-0 flex items-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFavorite(anime.mal_id);
                  }}
                  className="p-2.5 rounded-xl text-surface-400 hover:text-red-500 hover:bg-red-50 transition-all"
                  aria-label="Remove from favorites"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </PageContainer>
  );
}
