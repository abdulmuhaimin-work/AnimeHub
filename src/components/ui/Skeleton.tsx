import type { CSSProperties } from 'react';

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
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
    text: 'rounded h-4 w-full',
  };

  const style: CSSProperties = {
    width: width,
    height: height,
  };

  return (
    <div
      className={`${baseClass} ${variantClasses[variant]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

// Pre-built skeleton components for common use cases
export function AnimeCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <Skeleton className="aspect-[3/4] w-full" />
      <div className="p-4 space-y-3">
        <Skeleton height={20} width="80%" />
        <Skeleton height={16} width="50%" />
        <div className="flex gap-2">
          <Skeleton height={24} width={60} className="rounded-full" />
          <Skeleton height={24} width={50} className="rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function AnimeGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <AnimeCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function AnimeDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Poster */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <Skeleton width={300} height={450} className="rounded-2xl" />
        </div>
        
        {/* Info */}
        <div className="flex-1 space-y-6">
          <Skeleton height={40} width="70%" />
          <Skeleton height={24} width="40%" />
          
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height={28} width={80} className="rounded-full" />
            ))}
          </div>
          
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} height={16} width={i === 5 ? '60%' : '100%'} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

