import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Play, Tv } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { FavoriteButton } from './FavoriteButton';
import type { Anime } from '../../types/anime';

interface AnimeCardProps {
  anime: Anime;
  index?: number;
}

export const AnimeCard = memo(function AnimeCard({ anime, index = 0 }: AnimeCardProps) {
  const imageUrl = anime.images.jpg.large_image_url || anime.images.jpg.image_url;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Link to={`/anime/${anime.mal_id}`} className="block group">
        <article className="card card-hover relative overflow-hidden">
          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden bg-dark-700">
            <img
              src={imageUrl}
              alt={anime.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            
            {/* Favorite Button */}
            <div className="absolute top-3 right-3 z-10">
              <FavoriteButton anime={anime} size="sm" />
            </div>
            
            {/* Score Badge */}
            {anime.score && (
              <div className="absolute top-3 left-3 z-10">
                <div className="flex items-center gap-1 px-2 py-1 bg-dark-900/80 backdrop-blur-sm rounded-lg">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold text-white">{anime.score.toFixed(1)}</span>
                </div>
              </div>
            )}
            
            {/* Type & Episodes */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
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
            <h3 className="font-semibold text-white line-clamp-2 group-hover:text-primary-400 transition-colors mb-2">
              {anime.title}
            </h3>
            
            {/* Genres */}
            <div className="flex flex-wrap gap-1.5">
              {anime.genres.slice(0, 2).map((genre) => (
                <span 
                  key={genre.mal_id}
                  className="text-xs text-dark-300 bg-dark-700/50 px-2 py-0.5 rounded"
                >
                  {genre.name}
                </span>
              ))}
              {anime.genres.length > 2 && (
                <span className="text-xs text-dark-400">
                  +{anime.genres.length - 2}
                </span>
              )}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
});

