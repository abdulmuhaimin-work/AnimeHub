import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Input } from '../ui/Input';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ 
  onSearch, 
  placeholder = 'Search anime...', 
  className = '' 
}: SearchBarProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get('q') || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);
  const isFirstRender = useRef(true);

  // Sync query from URL on mount only
  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    if (urlQuery !== query && isFirstRender.current) {
      setQuery(urlQuery);
    }
    isFirstRender.current = false;
  }, [searchParams]);

  // Update URL with debounce when query changes (user typing)
  const updateUrl = useCallback((searchQuery: string) => {
    const params = new URLSearchParams(window.location.search);
    
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim());
    } else {
      params.delete('q');
    }

    const newSearch = params.toString();
    navigate(newSearch ? `/?${newSearch}` : '/', { replace: true });
    
    if (onSearch) {
      onSearch(searchQuery.trim());
    }
  }, [navigate, onSearch]);

  useEffect(() => {
    // Skip the first render to avoid navigating on mount
    if (isFirstRender.current) {
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      updateUrl(query);
    }, 400);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, updateUrl]);

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      <Input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        leftIcon={<Search size={20} className="text-surface-400" />}
        rightIcon={
          query && (
            <button
              onClick={handleClear}
              className="p-1 hover:bg-surface-100 rounded-lg transition-colors"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )
        }
      />
    </div>
  );
}
