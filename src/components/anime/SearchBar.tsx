import { useState, useEffect, useRef } from 'react';
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
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Update URL params with debounce
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      
      if (query.trim()) {
        params.set('q', query.trim());
      } else {
        params.delete('q');
      }

      // Only navigate if we're on the home page or if there's a query
      const newSearch = params.toString();
      navigate(`/?${newSearch}`, { replace: true });
      
      if (onSearch) {
        onSearch(query.trim());
      }
    }, 400);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, navigate, searchParams, onSearch]);

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
        leftIcon={<Search size={20} />}
        rightIcon={
          query && (
            <button
              onClick={handleClear}
              className="p-1 hover:bg-dark-600 rounded-full transition-colors"
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

