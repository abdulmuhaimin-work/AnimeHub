import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp } from 'lucide-react';
import { useAnimeList } from '../../api/hooks';
import { PageContainer } from '../../components/layout/PageContainer';
import { AnimeGrid } from '../../components/anime/AnimeGrid';
import { GenreFilter } from '../../components/anime/GenreFilter';

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get('q') || '';
  const genresParam = searchParams.get('genres') || '';
  const selectedGenres = genresParam ? genresParam.split(',').map(Number) : [];

  // Build filters
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

  // Flatten pages into single array
  const animes = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data]);

  // Handle genre changes
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
    <PageContainer>
      {/* Hero Section */}
      {!query && selectedGenres.length === 0 && (
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 md:mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-4">
            DISCOVER YOUR NEXT
            <span className="text-gradient block mt-2">ANIME OBSESSION</span>
          </h1>
          <p className="text-lg text-dark-300 max-w-2xl mx-auto">
            Explore thousands of anime titles, save your favorites, and find your next binge-worthy series.
          </p>
        </motion.section>
      )}

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          {query ? (
            <h2 className="text-xl md:text-2xl font-semibold text-white">
              Search results for "<span className="text-primary-400">{query}</span>"
            </h2>
          ) : (
            <div className="flex items-center gap-2">
              <TrendingUp className="text-primary-400" size={24} />
              <h2 className="text-xl md:text-2xl font-semibold text-white">
                {selectedGenres.length > 0 ? 'Filtered Anime' : 'Trending Now'}
              </h2>
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
        <p className="text-dark-400 text-sm mb-6">
          Showing {animes.length} of {data.pages[0]?.pagination?.items?.total || 0} results
        </p>
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

      {/* Empty state for no more results */}
      {!hasNextPage && animes.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Sparkles className="w-8 h-8 text-primary-400 mx-auto mb-3" />
          <p className="text-dark-300">You've seen them all! That's all the anime for now.</p>
        </motion.div>
      )}
    </PageContainer>
  );
}

