import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
import {movieItem} from 'types';
import {useQuery} from '@tanstack/react-query';

const useApi = (uri: string, method: string, key: string, page?: number) => {
  const fetchData = async () => {
    const url = 'https://api.themoviedb.org' + uri;

    const options = {
      method: method,
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmVjNmRjMmQ4OWZkYTU2ZGVmMmFlNWIyOGVhZDExOCIsIm5iZiI6MTcyNjQ4MDAzMy40ODMyNywic3ViIjoiNjZlN2UxOTZkZDIyNGQxYTM5OTFiZmMxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.F6qA5615t5mhz8-2IWZx7qH7ZBKW51ATC8ZpAZCYTd8',
      },
    };
    try {
      console.log('fetching' + url);
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data: any = await res.json();

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const {data, isLoading, error} = useQuery({
    queryFn: fetchData,
    queryKey: [key, uri, page],
    staleTime: 3600 * 1000,
    gcTime: 3600 * 1000,
  });

  return {data, isLoading, error};
};

export default useApi;

