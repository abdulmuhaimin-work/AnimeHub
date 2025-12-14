import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useFavoritesStore } from '../../store';
import type { Anime } from '../../types/anime';

interface FavoriteButtonProps {
  anime: Anime;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: { icon: 16, padding: 'p-1.5' },
  md: { icon: 20, padding: 'p-2' },
  lg: { icon: 24, padding: 'p-3' },
};

export function FavoriteButton({ 
  anime, 
  size = 'md', 
  showLabel = false,
  className = '' 
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const isFav = isFavorite(anime.mal_id);
  const config = sizeConfig[size];

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(anime);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className={`
        ${config.padding} rounded-full
        ${isFav 
          ? 'bg-accent-600/90 text-white' 
          : 'bg-dark-800/80 text-dark-300 hover:text-accent-400 hover:bg-dark-700/80'
        }
        backdrop-blur-sm transition-colors duration-200
        flex items-center gap-2
        ${className}
      `}
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      <motion.div
        animate={isFav ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Heart 
          size={config.icon} 
          fill={isFav ? 'currentColor' : 'none'}
          strokeWidth={2}
        />
      </motion.div>
      {showLabel && (
        <span className="text-sm font-medium pr-1">
          {isFav ? 'Favorited' : 'Favorite'}
        </span>
      )}
    </motion.button>
  );
}

