import { motion } from 'framer-motion';

// ===========================================
// Loading GIF Configuration
// ===========================================
const LOADING_GIF_URL = '/inunaka-akari.gif';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  variant?: 'rectangular' | 'circular' | 'text';
  shimmer?: boolean;
}

export function Skeleton({
  className = '',
  width,
  height,
  variant = 'rectangular',
  shimmer = true,
}: SkeletonProps) {
  const baseClass = shimmer ? 'skeleton-shimmer' : 'skeleton';
  
  const variantClasses: Record<string, string> = {
    rectangular: 'rounded-2xl',
    circular: 'rounded-full',
    text: 'rounded-lg h-4 w-full',
  };

  return (
    <div
      className={`${baseClass} ${variantClasses[variant]} ${className}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

// Anime card skeleton - matches AnimeCard component structure
export function AnimeCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      {/* Image area with overlay badges */}
      <div className="relative aspect-[3/4] bg-surface-200">
        <Skeleton className="absolute inset-0 rounded-none" />
        
        {/* Score badge skeleton */}
        <div className="absolute top-3 left-3 z-10">
          <Skeleton width={52} height={26} className="rounded-xl" />
        </div>
        
        {/* Favorite button skeleton */}
        <div className="absolute top-3 right-3 z-10">
          <Skeleton width={36} height={36} className="rounded-xl" />
        </div>
        
        {/* Type & Episodes badges skeleton */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
          <Skeleton width={50} height={24} className="rounded-xl" />
          <Skeleton width={50} height={24} className="rounded-xl" />
        </div>
      </div>
      
      {/* Content area */}
      <div className="p-4">
        {/* Title - 2 lines */}
        <div className="space-y-2 mb-3">
          <Skeleton height={16} width="90%" />
          <Skeleton height={16} width="60%" />
        </div>
        
        {/* Genre tags */}
        <div className="flex flex-wrap gap-1.5">
          <Skeleton height={22} width={55} className="rounded-lg" />
          <Skeleton height={22} width={48} className="rounded-lg" />
          <Skeleton height={22} width={62} className="rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// Anime-themed grid skeleton with GIF loader
export function AnimeGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="space-y-8">
      {/* Loading indicator with anime GIF */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-12"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <img 
            src={LOADING_GIF_URL} 
            alt="Loading..." 
            className="w-24 h-24 object-contain"
          />
        </motion.div>

        <h3 className="text-lg font-bold text-surface-800 mb-1">Loading Anime</h3>
        <p className="text-surface-600 text-sm">Fetching the latest titles...</p>
        
        {/* Cute progress bar */}
        <div className="w-48 h-2 bg-surface-200 rounded-full mt-4 overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="h-full w-1/2 bg-gradient-to-r from-accent-400 to-primary-400 rounded-full"
          />
        </div>
      </motion.div>

      {/* Skeleton grid - matches AnimeGrid layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 opacity-50">
        {Array.from({ length: count }).map((_, i) => (
          <AnimeCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export function AnimeDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Loading indicator with anime GIF */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-8 mb-8"
      >
        <img 
          src={LOADING_GIF_URL} 
          alt="Loading..." 
          className="w-20 h-20 object-contain mb-4"
        />
        <span className="text-surface-600 font-medium">Loading anime details...</span>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8 opacity-50">
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <Skeleton width={300} height={450} className="rounded-3xl" />
        </div>
        
        <div className="flex-1 space-y-6">
          <Skeleton height={40} width="70%" />
          <Skeleton height={24} width="40%" />
          
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height={32} width={80} className="rounded-xl" />
            ))}
          </div>
          
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} height={16} width={i === 5 ? '60%' : '100%'} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

