import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, Filter } from 'lucide-react';
import { useGenres } from '../../api/hooks';
import { Button } from '../ui/Button';

interface GenreFilterProps {
  selectedGenres: number[];
  onGenresChange: (genres: number[]) => void;
}

export function GenreFilter({ selectedGenres, onGenresChange }: GenreFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: genresData, isLoading } = useGenres();
  
  const genres = genresData?.data || [];

  const toggleGenre = (genreId: number) => {
    if (selectedGenres.includes(genreId)) {
      onGenresChange(selectedGenres.filter((id) => id !== genreId));
    } else {
      onGenresChange([...selectedGenres, genreId]);
    }
  };

  const clearGenres = () => {
    onGenresChange([]);
  };

  const selectedGenreNames = genres
    .filter((g) => selectedGenres.includes(g.mal_id))
    .map((g) => g.name);

  return (
    <div className="relative">
      <Button
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
        leftIcon={<Filter size={18} />}
        rightIcon={
          <ChevronDown 
            size={18} 
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        }
        className="relative"
      >
        Genres
        {selectedGenres.length > 0 && (
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
            {selectedGenres.length}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-surface-900/20 md:bg-transparent"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile: Bottom sheet / Desktop: Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-x-4 bottom-4 md:absolute md:inset-auto md:right-0 md:bottom-auto md:mt-2 
                        w-auto md:w-80 max-h-[70vh] md:max-h-96 overflow-y-auto
                        bg-white border-2 border-surface-200 rounded-3xl 
                        shadow-xl z-50"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-surface-200 p-4 flex items-center justify-between rounded-t-3xl">
                <h3 className="font-bold text-surface-800">Filter by Genre</h3>
                <div className="flex items-center gap-2">
                  {selectedGenres.length > 0 && (
                    <button
                      onClick={clearGenres}
                      className="text-sm text-surface-600 hover:text-accent-600 flex items-center gap-1 font-medium"
                    >
                      <X size={14} />
                      Clear
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="md:hidden p-1 text-surface-400 hover:text-surface-600 rounded-lg hover:bg-surface-100"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Genres Grid */}
              <div className="p-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin w-6 h-6 border-2 border-accent-500 border-t-transparent rounded-full" />
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => {
                      const isSelected = selectedGenres.includes(genre.mal_id);
                      return (
                        <button
                          key={genre.mal_id}
                          onClick={() => toggleGenre(genre.mal_id)}
                          className={`
                            px-3 py-1.5 rounded-xl text-sm font-semibold
                            transition-all duration-200
                            ${isSelected
                              ? 'bg-accent-500 text-white shadow-kawaii'
                              : 'bg-surface-100 text-surface-600 hover:bg-accent-100 hover:text-accent-600'
                            }
                          `}
                        >
                          {genre.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Selected Summary */}
              {selectedGenreNames.length > 0 && (
                <div className="sticky bottom-0 bg-surface-50 border-t border-surface-200 p-4 rounded-b-3xl">
                  <p className="text-sm text-surface-600">
                    Selected: <span className="text-surface-800 font-medium">{selectedGenreNames.join(', ')}</span>
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
