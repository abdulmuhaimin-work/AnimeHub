import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Compass, Sparkles } from 'lucide-react';
import { useFavoritesStore } from '../../store';
import { SearchBar } from '../anime/SearchBar';

export function Header() {
  const location = useLocation();
  const { favorites } = useFavoritesStore();
  
  const isHome = location.pathname === '/';
  const isFavorites = location.pathname === '/favorites';

  return (
    <header className="sticky top-0 z-40 glass border-b border-surface-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 flex-shrink-0 group"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-accent-400 to-primary-500 
                         flex items-center justify-center shadow-kawaii"
            >
              <Sparkles className="text-white" size={24} />
            </motion.div>
            
            <div className="hidden sm:block">
              <span className="font-display text-2xl md:text-3xl font-bold text-surface-800 tracking-wide">
                Anime<span className="text-gradient">Hub</span>
              </span>
            </div>
          </Link>

          {/* Search */}
          {isHome && (
            <div className="flex-1 max-w-xl hidden md:block">
              <SearchBar />
            </div>
          )}

          {/* Navigation */}
          <nav className="flex items-center gap-1 md:gap-2">
            <Link
              to="/"
              className={`
                px-4 py-2.5 rounded-2xl font-semibold transition-all duration-200
                flex items-center gap-2
                ${isHome 
                  ? 'text-accent-600 bg-accent-50 shadow-sm' 
                  : 'text-surface-600 hover:text-accent-600 hover:bg-accent-50'
                }
              `}
            >
              <Compass size={18} />
              <span className="hidden sm:inline">Browse</span>
            </Link>
            
            <Link
              to="/favorites"
              className={`
                relative px-4 py-2.5 rounded-2xl font-semibold transition-all duration-200
                flex items-center gap-2
                ${isFavorites 
                  ? 'text-accent-600 bg-accent-50 shadow-sm' 
                  : 'text-surface-600 hover:text-accent-600 hover:bg-accent-50'
                }
              `}
            >
              <Heart 
                size={18} 
                className={isFavorites || favorites.length > 0 ? 'text-accent-500' : ''} 
                fill={isFavorites || favorites.length > 0 ? 'currentColor' : 'none'}
              />
              <span className="hidden sm:inline">Favorites</span>
              
              {favorites.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 
                           bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs font-bold rounded-full 
                           flex items-center justify-center shadow-kawaii"
                >
                  {favorites.length > 99 ? '99+' : favorites.length}
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
