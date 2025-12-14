import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Star, 
  Calendar, 
  Clock, 
  Tv, 
  Users, 
  Trophy,
  Play,
  ExternalLink 
} from 'lucide-react';
import { useAnimeDetail } from '../../api/hooks';
import { PageContainer } from '../../components/layout/PageContainer';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { AnimeDetailSkeleton } from '../../components/ui/Skeleton';
import { FavoriteButton } from '../../components/anime/FavoriteButton';
import { ShareButton } from '../../components/anime/ShareButton';

export function AnimeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const animeId = id ? parseInt(id, 10) : undefined;

  const { data, isLoading, error } = useAnimeDetail(animeId);
  const anime = data?.data;

  if (isLoading) {
    return (
      <PageContainer>
        <AnimeDetailSkeleton />
      </PageContainer>
    );
  }

  if (error || !anime) {
    return (
      <PageContainer>
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
            <span className="text-4xl">😢</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Anime Not Found</h1>
          <p className="text-dark-300 mb-6">
            {error?.message || "We couldn't find the anime you're looking for."}
          </p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft size={18} className="mr-2" />
            Back to Browse
          </Button>
        </div>
      </PageContainer>
    );
  }

  const imageUrl = anime.images.jpg.large_image_url || anime.images.jpg.image_url;

  return (
    <>
      {/* Hero Background */}
      <div 
        className="absolute inset-x-0 top-0 h-[500px] -z-10"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/60 via-dark-900/90 to-dark-900" />
      </div>

      <PageContainer className="pt-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
            <ArrowLeft size={18} className="mr-2" />
            Back
          </Button>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-shrink-0 mx-auto lg:mx-0"
          >
            <div className="relative group">
              <img
                src={imageUrl}
                alt={anime.title}
                className="w-64 md:w-80 rounded-2xl shadow-2xl shadow-dark-900/50"
              />
              
              {/* Trailer Play Button */}
              {anime.trailer?.youtube_id && (
                <a
                  href={anime.trailer.url || `https://youtube.com/watch?v=${anime.trailer.youtube_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-dark-900/60 
                           opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"
                >
                  <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center shadow-lg">
                    <Play size={28} className="text-white ml-1" fill="currentColor" />
                  </div>
                </a>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <FavoriteButton anime={anime} size="lg" showLabel className="flex-1" />
              <ShareButton title={anime.title} className="flex-shrink-0" />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 min-w-0"
          >
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
              {anime.title}
            </h1>
            
            {anime.title_english && anime.title_english !== anime.title && (
              <p className="text-xl text-dark-300 mb-4">{anime.title_english}</p>
            )}

            {anime.title_japanese && (
              <p className="text-lg text-dark-400 mb-6">{anime.title_japanese}</p>
            )}

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {anime.score && (
                <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                  <Star className="text-yellow-400" size={20} fill="currentColor" />
                  <span className="text-xl font-bold text-white">{anime.score}</span>
                  <span className="text-dark-400 text-sm">
                    ({anime.scored_by?.toLocaleString()} votes)
                  </span>
                </div>
              )}

              {anime.rank && (
                <div className="flex items-center gap-2 px-4 py-2 bg-primary-500/10 rounded-xl border border-primary-500/20">
                  <Trophy className="text-primary-400" size={20} />
                  <span className="font-bold text-white">#{anime.rank}</span>
                  <span className="text-dark-400 text-sm">Ranked</span>
                </div>
              )}

              {anime.popularity && (
                <div className="flex items-center gap-2 px-4 py-2 bg-accent-500/10 rounded-xl border border-accent-500/20">
                  <Users className="text-accent-400" size={20} />
                  <span className="font-bold text-white">#{anime.popularity}</span>
                  <span className="text-dark-400 text-sm">Popular</span>
                </div>
              )}
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {anime.genres.map((genre) => (
                <Badge key={genre.mal_id} variant="primary">
                  {genre.name}
                </Badge>
              ))}
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {anime.type && (
                <div className="flex items-center gap-3 p-3 bg-dark-800/50 rounded-xl">
                  <Tv className="text-dark-400" size={20} />
                  <div>
                    <p className="text-xs text-dark-400">Type</p>
                    <p className="font-medium text-white">{anime.type}</p>
                  </div>
                </div>
              )}

              {anime.episodes && (
                <div className="flex items-center gap-3 p-3 bg-dark-800/50 rounded-xl">
                  <Play className="text-dark-400" size={20} />
                  <div>
                    <p className="text-xs text-dark-400">Episodes</p>
                    <p className="font-medium text-white">{anime.episodes}</p>
                  </div>
                </div>
              )}

              {anime.duration && (
                <div className="flex items-center gap-3 p-3 bg-dark-800/50 rounded-xl">
                  <Clock className="text-dark-400" size={20} />
                  <div>
                    <p className="text-xs text-dark-400">Duration</p>
                    <p className="font-medium text-white">{anime.duration}</p>
                  </div>
                </div>
              )}

              {anime.aired?.string && (
                <div className="flex items-center gap-3 p-3 bg-dark-800/50 rounded-xl">
                  <Calendar className="text-dark-400" size={20} />
                  <div>
                    <p className="text-xs text-dark-400">Aired</p>
                    <p className="font-medium text-white text-sm">{anime.aired.string}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Status Badge */}
            <div className="mb-6">
              <Badge 
                variant={anime.airing ? 'success' : anime.status === 'Not yet aired' ? 'warning' : 'default'}
              >
                {anime.status}
              </Badge>
            </div>

            {/* Synopsis */}
            {anime.synopsis && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Synopsis</h2>
                <p className="text-dark-200 leading-relaxed whitespace-pre-line">
                  {anime.synopsis}
                </p>
              </div>
            )}

            {/* Studios */}
            {anime.studios.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-3">Studios</h2>
                <div className="flex flex-wrap gap-2">
                  {anime.studios.map((studio) => (
                    <Badge key={studio.mal_id} variant="default">
                      {studio.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* External Link */}
            <a
              href={anime.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
            >
              View on MyAnimeList
              <ExternalLink size={16} />
            </a>
          </motion.div>
        </div>
      </PageContainer>
    </>
  );
}

