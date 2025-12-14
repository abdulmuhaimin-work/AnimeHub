import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Play, Tv, Info } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { FavoriteButton } from './FavoriteButton';
import type { Anime } from '../../types/anime';

interface AnimeCardProps {
  anime: Anime;
  index?: number;
}

export const AnimeCard = memo(function AnimeCard({ anime, index = 0 }: AnimeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const imageUrl = anime.images.jpg.large_image_url || anime.images.jpg.image_url;
  
  const synopsis = anime.synopsis 
    ? anime.synopsis.length > 200 
      ? anime.synopsis.slice(0, 200) + '...' 
      : anime.synopsis
    : 'No synopsis available.';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/anime/${anime.mal_id}`} className="block group">
        <article className="card card-hover relative overflow-hidden">
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden bg-surface-200">
            <img
              src={imageUrl}
              alt={anime.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Default Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-300" />
            
            {/* Synopsis Overlay on Hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-gradient-to-t from-surface-900 via-surface-900/95 to-surface-900/80 
                           flex flex-col justify-end p-4 z-20"
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.2, delay: 0.05 }}
                  >
                    <div className="flex items-center gap-1.5 text-accent-300 text-xs font-semibold mb-2">
                      <Info size={12} />
                      <span>Synopsis</span>
                    </div>
                    <p className="text-sm text-surface-100 leading-relaxed line-clamp-6">
                      {synopsis}
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Favorite Button */}
            <div className="absolute top-3 right-3 z-30">
              <FavoriteButton anime={anime} size="sm" />
            </div>
            
            {/* Score Badge */}
            {anime.score && (
              <div className="absolute top-3 left-3 z-30">
                <div className="flex items-center gap-1 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-bold text-surface-800">{anime.score.toFixed(1)}</span>
                </div>
              </div>
            )}
            
            {/* Type & Episodes */}
            <div className={`absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 
                          transition-opacity duration-200 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
              <div className="flex items-center gap-2">
                {anime.type && (
                  <Badge variant="primary">
                    <Tv size={12} className="mr-1" />
                    {anime.type}
                  </Badge>
                )}
              </div>
              {anime.episodes && (
                <Badge variant="default">
                  <Play size={12} className="mr-1" />
                  {anime.episodes} ep
                </Badge>
              )}
            </div>
          </div>
          
          {/* Content */}
          <div className="p-4">
            <h3 className="font-bold text-surface-800 line-clamp-2 group-hover:text-accent-600 transition-colors mb-2">
              {anime.title}
            </h3>
            
            {/* Genres */}
            <div className="flex flex-wrap gap-1.5">
              {anime.genres.map((genre) => (
                <span 
                  key={genre.mal_id}
                  className="text-xs text-surface-600 bg-surface-100 px-2 py-0.5 rounded-lg font-medium"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
});
