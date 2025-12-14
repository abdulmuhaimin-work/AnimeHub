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
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">
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
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto
                         bg-dark-800 border border-dark-600/50 rounded-xl 
                         shadow-2xl z-50"
            >
              {/* Header */}
              <div className="sticky top-0 bg-dark-800 border-b border-dark-600/50 p-4 flex items-center justify-between">
                <h3 className="font-semibold text-white">Filter by Genre</h3>
                {selectedGenres.length > 0 && (
                  <button
                    onClick={clearGenres}
                    className="text-sm text-dark-300 hover:text-white flex items-center gap-1"
                  >
                    <X size={14} />
                    Clear all
                  </button>
                )}
              </div>

              {/* Genres Grid */}
              <div className="p-4">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full" />
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
                            px-3 py-1.5 rounded-full text-sm font-medium
                            transition-all duration-200
                            ${isSelected
                              ? 'bg-primary-600 text-white'
                              : 'bg-dark-700 text-dark-200 hover:bg-dark-600 hover:text-white'
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
                <div className="sticky bottom-0 bg-dark-800 border-t border-dark-600/50 p-4">
                  <p className="text-sm text-dark-300">
                    Selected: <span className="text-white">{selectedGenreNames.join(', ')}</span>
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

