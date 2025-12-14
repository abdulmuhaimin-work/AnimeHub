import { useQuery } from '@tanstack/react-query';
import { fetchGenres } from '../animeApi';
import { STALE_TIMES } from '../config';

export function useGenres() {
  return useQuery({
    queryKey: ['genres'],
    queryFn: fetchGenres,
    staleTime: STALE_TIMES.genres,
  });
}

