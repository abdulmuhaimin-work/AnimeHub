import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { AnimeCard } from './AnimeCard';
import { AnimeGridSkeleton } from '../ui/Skeleton';
import type { Anime } from '../../types/anime';

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

  // Trigger infinite scroll
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
          <span className="text-3xl">😵</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Something went wrong</h3>
        <p className="text-dark-300 max-w-md">{error.message}</p>
      </motion.div>
    );
  }

  if (animes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-primary-500/10 flex items-center justify-center mb-4">
          <span className="text-3xl">🔍</span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No anime found</h3>
        <p className="text-dark-300">Try adjusting your search or filters</p>
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

      {/* Infinite Scroll Trigger */}
      {hasNextPage && (
        <div ref={loadMoreRef} className="flex justify-center py-10">
          {isFetchingNextPage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 text-dark-300"
            >
              <Loader2 className="animate-spin" size={24} />
              <span>Loading more anime...</span>
            </motion.div>
          )}
        </div>
      )}
    </>
  );
}

