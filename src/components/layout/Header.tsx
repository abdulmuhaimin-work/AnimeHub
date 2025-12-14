import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { useFavoritesStore } from '../../store';
import { SearchBar } from '../anime/SearchBar';

export function Header() {
  const location = useLocation();
  const { favorites } = useFavoritesStore();
  
  const isHome = location.pathname === '/';
  const isFavorites = location.pathname === '/favorites';

  return (
    <header className="sticky top-0 z-40 glass border-b border-dark-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 flex-shrink-0 group"
          >
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 
                         flex items-center justify-center"
            >
              <Sparkles className="text-white" size={22} />
            </motion.div>
            <span className="font-display text-2xl md:text-3xl text-white tracking-wide hidden sm:block">
              ANIME<span className="text-gradient">HUB</span>
            </span>
          </Link>

          {/* Search - Hidden on mobile, shown inline on desktop */}
          {isHome && (
            <div className="flex-1 max-w-xl hidden md:block">
              <SearchBar />
            </div>
          )}

          {/* Navigation */}
          <nav className="flex items-center gap-2 md:gap-4">
            <Link
              to="/"
              className={`
                px-3 py-2 rounded-lg font-medium transition-all duration-200
                ${isHome 
                  ? 'text-white bg-dark-700/50' 
                  : 'text-dark-300 hover:text-white hover:bg-dark-700/30'
                }
              `}
            >
              Browse
            </Link>
            
            <Link
              to="/favorites"
              className={`
                relative px-3 py-2 rounded-lg font-medium transition-all duration-200
                flex items-center gap-2
                ${isFavorites 
                  ? 'text-white bg-dark-700/50' 
                  : 'text-dark-300 hover:text-white hover:bg-dark-700/30'
                }
              `}
            >
              <Heart size={18} className={isFavorites ? 'fill-accent-400 text-accent-400' : ''} />
              <span className="hidden sm:inline">Favorites</span>
              {favorites.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-white 
                           text-xs font-bold rounded-full flex items-center justify-center"
                >
                  {favorites.length}
                </motion.span>
              )}
            </Link>
          </nav>
        </div>

        {/* Mobile Search */}
        {isHome && (
          <div className="pb-4 md:hidden">
            <SearchBar />
          </div>
        )}
      </div>
    </header>
  );
}

