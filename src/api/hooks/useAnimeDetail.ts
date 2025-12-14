import { useQuery } from '@tanstack/react-query';
import { fetchAnimeById } from '../animeApi';
import { STALE_TIMES } from '../config';

export function useAnimeDetail(id: number | undefined) {
  return useQuery({
    queryKey: ['anime', 'detail', id],
    queryFn: () => fetchAnimeById(id!),
    enabled: !!id,
    staleTime: STALE_TIMES.animeDetail,
  });
}

