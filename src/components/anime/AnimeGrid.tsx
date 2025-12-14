import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { AlertCircle, Search } from 'lucide-react';
import { AnimeCard } from './AnimeCard';
import { AnimeGridSkeleton } from '../ui/Skeleton';
import type { Anime } from '../../types/anime';

// ===========================================
// Loading GIF Configuration
// ===========================================
const LOADING_GIF_URL = '/inunaka-akari.gif';

interface AnimeGridProps {
  animes: Anime[];
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  error?: Error | null;
}

export function AnimeGrid({
  animes,
  isLoading = false,
  isFetchingNextPage = false,
  hasNextPage = false,
  fetchNextPage,
  error,
}: AnimeGridProps) {
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: '200px',
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && fetchNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <AnimeGridSkeleton count={12} />;
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="w-20 h-20 rounded-3xl bg-red-100 
                       flex items-center justify-center mb-6 border-2 border-red-200">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h3 className="text-2xl font-bold text-surface-800 mb-2">
          Oops! Something Went Wrong
        </h3>
        <p className="text-surface-600 max-w-md mb-2">{error.message}</p>
        <p className="text-surface-400 text-sm">Please try again later</p>
      </motion.div>
    );
  }

  if (animes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="w-20 h-20 rounded-3xl bg-accent-100 
                       flex items-center justify-center mb-6 border-2 border-accent-200">
          <Search className="w-10 h-10 text-accent-500" />
        </div>
        <h3 className="text-2xl font-bold text-surface-800 mb-2">No Results Found</h3>
        <p className="text-surface-600">Try adjusting your search or filters</p>
      </motion.div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {animes.map((anime, index) => (
          <AnimeCard key={anime.mal_id} anime={anime} index={index} />
        ))}
      </div>

      {/* Infinite Scroll Trigger with anime GIF */}
      {hasNextPage && (
        <div ref={loadMoreRef} className="flex justify-center py-10">
          {isFetchingNextPage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-3"
            >
              <img 
                src={LOADING_GIF_URL} 
                alt="Loading more..." 
                className="w-16 h-16 object-contain"
              />
              <span className="text-surface-600 text-sm font-medium">Loading more anime...</span>
            </motion.div>
          )}
        </div>
      )}
    </>
  );
}
