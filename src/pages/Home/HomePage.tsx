import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, Filter } from 'lucide-react';
import { useAnimeList } from '../../api/hooks';
import { PageContainer } from '../../components/layout/PageContainer';
import { AnimeGrid } from '../../components/anime/AnimeGrid';
import { GenreFilter } from '../../components/anime/GenreFilter';

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get('q') || '';
  const genresParam = searchParams.get('genres') || '';
  const selectedGenres = genresParam ? genresParam.split(',').map(Number) : [];

  const filters = useMemo(() => {
    const f: Record<string, string> = {};
    if (query) f.q = query;
    if (selectedGenres.length > 0) f.genres = selectedGenres.join(',');
    return f;
  }, [query, selectedGenres]);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useAnimeList(filters);

  const animes = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  const handleGenresChange = (genres: number[]) => {
    const params = new URLSearchParams(searchParams);
    if (genres.length > 0) {
      params.set('genres', genres.join(','));
    } else {
      params.delete('genres');
    }
    setSearchParams(params, { replace: true });
  };

  return (
    <>
      {/* Background Image */}
      <div 
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/cartoon-depiction-gates-heaven.jpg')" }}
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-white/60 via-white/75 to-white/90" />
      
    <PageContainer>
      {/* Hero Section */}
      {!query && selectedGenres.length === 0 && (
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16 relative overflow-visible"
        >
          {/* Background Effects - Extended vertically only */}
          <div className="absolute -top-20 -bottom-20 left-0 right-0 -z-10 overflow-visible pointer-events-none">
            {/* Decorative blobs */}
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-accent-200/40 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent-200/20 rounded-full blur-3xl" />
            
            {/* Meteor Shower Background */}
            {[...Array(12)].map((_, i) => {
              // Constrain to stay within viewport (max ~500px from center)
              const maxOffset = 700;
              const startX = -maxOffset + (i % 6) * (maxOffset * 2 / 5);
              const startY = -100 - (Math.floor(i / 6) * 60);
              const endX = startX + 400; // Shorter horizontal travel
              const endY = startY + 600;
              const duration = 2 + (i % 4) * 0.5;
              const delay = i * 0.3;
              
              // Calculate angle of travel in degrees
              const deltaX = endX - startX;
              const deltaY = endY - startY;
              const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
              
              return (
                <motion.div
                  key={i}
                  initial={{ 
                    opacity: 0,
                    x: startX,
                    y: startY,
                    rotate: angle,
                  }}
                  animate={{ 
                    opacity: [0, 0.8, 0.8, 0],
                    x: [startX, endX],
                    y: [startY, endY],
                    rotate: [angle, angle + 180],
                  }}
                  transition={{ 
                    duration: duration,
                    repeat: Infinity,
                    delay: delay,
                    ease: "easeOut"
                  }}
                  className="absolute pointer-events-none"
                  style={{
                    left: '50%',
                    width: '3px',
                    height: '80px',
                    background: `linear-gradient(${angle + 90}deg, transparent, #22c55e, #3b82f6, transparent)`,
                    borderRadius: '50%',
                    boxShadow: '0 0 10px rgba(34, 197, 94, 0.6), 0 0 20px rgba(59, 130, 246, 0.4)',
                    transformOrigin: 'top center',
                  }}
                />
              );
            })}
            
            {/* Twinkling stars */}
            {[...Array(20)].map((_, i) => {
              const x = (Math.random() - 0.5) * 1200;
              const y = (Math.random() - 0.5) * 500;
              const size = 2 + Math.random() * 2;
              const delay = Math.random() * 3;
              
              return (
                <motion.div
                  key={`star-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 0.8, 0],
                    scale: [0.5, 1.3, 0.5],
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: delay,
                    ease: "easeInOut"
                  }}
                  className="absolute rounded-full bg-white pointer-events-none"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)',
                  }}
                />
              );
            })}
          </div>

          {/* Content with z-index */}
          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-accent-100 to-primary-100 
                        border-2 border-accent-200 rounded-full text-accent-600 text-sm font-semibold mb-6"
            >
              <Sparkles size={16} />
              <span>Your Anime Adventure Starts Here!</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-surface-800 mb-6">
              <span className="block">Discover Amazing</span>
              <span className="block mt-2 text-gradient">
                Anime Series
              </span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-surface-600 max-w-2xl mx-auto"
            >
              Explore thousands of titles, find hidden gems, and build your ultimate watchlist!
            </motion.p>
          </div>
        </motion.section>
      )}

      {/* Search Results Header */}
      {query && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-surface-800 mb-1">
            Search Results
          </h2>
          <p className="text-surface-600">
            Showing results for "<span className="text-accent-600 font-semibold">{query}</span>"
          </p>
        </motion.div>
      )}

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          {!query && (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-100 to-primary-100 
                            flex items-center justify-center border-2 border-accent-200">
                {selectedGenres.length > 0 ? (
                  <Filter className="text-accent-600" size={22} />
                ) : (
                  <TrendingUp className="text-accent-600" size={22} />
                )}
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-display font-bold text-surface-800">
                  {selectedGenres.length > 0 ? 'Filtered Results' : 'Trending Now'}
                </h2>
                <p className="text-surface-600 text-sm">
                  {selectedGenres.length > 0 
                    ? `${selectedGenres.length} genre${selectedGenres.length > 1 ? 's' : ''} selected`
                    : 'Popular anime this season'
                  }
                </p>
              </div>
            </div>
          )}
        </div>

        <GenreFilter
          selectedGenres={selectedGenres}
          onGenresChange={handleGenresChange}
        />
      </div>

      {/* Results count */}
      {data && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-sm mb-6"
        >
          <div className="w-2 h-2 bg-accent-400 rounded-full" />
          <span className="text-surface-600">
            Showing <span className="text-surface-800 font-semibold">{animes.length}</span> of{' '}
            <span className="text-surface-800 font-semibold">{data.pages[0]?.pagination?.items?.total || 0}</span> anime
          </span>
        </motion.div>
      )}

      {/* Anime Grid */}
      <AnimeGrid
        animes={animes}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        error={error as Error | null}
      />

      {/* End of results */}
      {!hasNextPage && animes.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="flex justify-center gap-2 mb-4">
            {['bg-accent-300', 'bg-primary-300', 'bg-accent-300'].map((color, i) => (
              <div key={i} className={`w-8 h-1 ${color} rounded-full`} />
            ))}
          </div>
          <p className="text-surface-600 font-medium">You've reached the end!</p>
        </motion.div>
      )}
    </PageContainer>
    </>
  );
}
