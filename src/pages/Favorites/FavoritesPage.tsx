import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, Play, Tv, Trash2, ArrowRight, Bookmark, Filter, TrendingUp } from 'lucide-react';
import { useFavoritesStore } from '../../store';
import { PageContainer } from '../../components/layout/PageContainer';
import { Button } from '../../components/ui/Button';

type SortOption = 'date' | 'score' | 'title' | 'episodes';
type FilterType = 'all' | 'TV' | 'Movie' | 'OVA' | 'ONA' | 'Special';

export function FavoritesPage() {
  const { favorites, removeFavorite, clearFavorites } = useFavoritesStore();
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [minScore, setMinScore] = useState<number>(0);

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

  // Filter and sort favorites
  const filteredAndSorted = useMemo(() => {
    let filtered = favorites.filter(fav => {
      if (filterType !== 'all' && fav.type !== filterType) return false;
      if (fav.score && fav.score < minScore) return false;
      return true;
    });

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return b.addedAt - a.addedAt;
        case 'score':
          return (b.score || 0) - (a.score || 0);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'episodes':
          return (b.episodes || 0) - (a.episodes || 0);
        default:
          return 0;
      }
    });

    return sorted;
  }, [favorites, sortBy, filterType, minScore]);

  // Calculate genre distribution
  const genreStats = useMemo(() => {
    const genreMap = new Map<string, number>();
    favorites.forEach(fav => {
      // Note: FavoriteAnime doesn't have genres, but we can show type distribution
      const type = fav.type || 'Unknown';
      genreMap.set(type, (genreMap.get(type) || 0) + 1);
    });
    return Array.from(genreMap.entries())
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count);
  }, [favorites]);

  // Calculate average score
  const avgScore = useMemo(() => {
    const scores = favorites.filter(f => f.score).map(f => f.score!);
    return scores.length > 0 
      ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
      : '0';
  }, [favorites]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
      <div className="flex gap-6 lg:gap-8">
        {/* Left Sidebar - Filters & Sort */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="sticky top-6 space-y-4"
        >
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-4">
              <Filter size={18} className="text-accent-500" />
              <h2 className="font-bold text-surface-800">Filter & Sort</h2>
            </div>

            {/* Sort */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-surface-700 mb-2 block">
                Sort by
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full px-3 py-2 bg-white border-2 border-surface-300 rounded-xl text-surface-800 text-sm focus:outline-none focus:border-accent-400"
              >
                <option value="date">Date Added</option>
                <option value="score">Score</option>
                <option value="title">Title</option>
                <option value="episodes">Episodes</option>
              </select>
            </div>

            {/* Filter by Type */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-surface-700 mb-2 block">
                Type
              </label>
              <div className="space-y-1">
                {(['all', 'TV', 'Movie', 'OVA', 'ONA', 'Special'] as FilterType[]).map(type => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      filterType === type
                        ? 'bg-accent-100 text-accent-700 font-semibold'
                        : 'text-surface-600 hover:bg-surface-100'
                    }`}
                  >
                    {type === 'all' ? 'All Types' : type}
                  </button>
                ))}
              </div>
            </div>

            {/* Min Score Filter */}
            <div>
              <label className="text-sm font-semibold text-surface-700 mb-2 block">
                Min Score: {minScore}
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={minScore}
                onChange={(e) => setMinScore(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </motion.div>
      </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
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
        {filteredAndSorted.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-surface-600">No favorites match your filters.</p>
            <Button
              variant="ghost"
              onClick={() => {
                setFilterType('all');
                setMinScore(0);
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </motion.div>
        ) : (
          filteredAndSorted.map((anime, index) => (
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
        )))}
          </div>
        </div>

        {/* Right Sidebar - Stats */}
        <aside className="hidden xl:block w-64 flex-shrink-0">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="sticky top-6 space-y-4"
        >
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-primary-500" />
              <h2 className="font-bold text-surface-800">Statistics</h2>
            </div>

            {/* Average Score */}
            <div className="mb-4 p-3 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl border-2 border-yellow-200">
              <div className="text-sm text-surface-600 mb-1">Average Score</div>
              <div className="text-2xl font-bold text-yellow-600">{avgScore}</div>
            </div>

            {/* Type Distribution */}
            <div>
              <div className="text-sm font-semibold text-surface-700 mb-3">Type Distribution</div>
              <div className="space-y-2">
                {genreStats.slice(0, 5).map(({ type, count }) => {
                  const percentage = (count / favorites.length) * 100;
                  return (
                    <div key={type}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-surface-600">{type}</span>
                        <span className="text-surface-800 font-semibold">{count}</span>
                      </div>
                      <div className="h-2 bg-surface-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-primary-400 to-accent-400"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p-4">
            <h3 className="font-semibold text-surface-800 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Link to="/">
                <Button variant="ghost" className="w-full justify-start" rightIcon={<ArrowRight size={16} />}>
                  Browse More
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={() => {
                  setSortBy('score');
                  setFilterType('all');
                  setMinScore(8);
                }}
                className="w-full justify-start"
                rightIcon={<Star size={16} />}
              >
                Top Rated Only
              </Button>
            </div>
          </div>
        </motion.div>
      </aside>
      </div>
    </div>
  );
}
