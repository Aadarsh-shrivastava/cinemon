import {useInfiniteQuery} from '@tanstack/react-query';
import {useEffect} from 'react';

const useInfiniteApi = (uri: string, method: string, key: string) => {
  console.log('refetching');
  const fetchData = async ({pageParam = 1}) => {
    const url = `https://api.themoviedb.org/${uri}?page=${pageParam}`;
    const options = {
      method: method,
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmVjNmRjMmQ4OWZkYTU2ZGVmMmFlNWIyOGVhZDExOCIsIm5iZiI6MTcyNjQ4MDAzMy40ODMyNywic3ViIjoiNjZlN2UxOTZkZDIyNGQxYTM5OTFiZmMxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.F6qA5615t5mhz8-2IWZx7qH7ZBKW51ATC8ZpAZCYTd8',
      },
    };
    console.log('getching', url);

    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    console.log(res.status);
    return data;
  };

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    staleTime: 1000 * 3600,
    gcTime: 1000 * 3600,
    queryKey: [key, uri],
    queryFn: fetchData,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

  return {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default useInfiniteApi;
