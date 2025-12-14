import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchAnimeList, type FetchAnimeListParams } from '../animeApi';
import { STALE_TIMES } from '../config';

export function useAnimeList(filters: Omit<FetchAnimeListParams, 'page'> = {}) {
  return useInfiniteQuery({
    queryKey: ['anime', 'list', filters],
    queryFn: ({ pageParam = 1 }) => fetchAnimeList({ ...filters, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.has_next_page) {
        return lastPage.pagination.current_page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: STALE_TIMES.animeList,
  });
}

