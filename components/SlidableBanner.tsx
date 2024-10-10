import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
import {movieItem} from 'types';
import {useQuery} from '@tanstack/react-query';
import Banner from './Banner';
import useApi from '../hooks/useApi';

interface SlidableBannerProps {}
const SlidableBanner = ({}: SlidableBannerProps) => {
  const {theme, toggleTheme} = useTheme();

  const {data: movies, isLoading} = useApi(
    '/3/movie/now_playing',
    'GET',
    'banners',
  );
  return (
    <View style={styles(theme).container}>
      {!isLoading && (
        <FlatList
          style={{width: '100%'}}
          data={movies?.results.slice(10, 15)}
          horizontal
          pagingEnabled
          renderItem={({item}) => <Banner Movie={item} />}
          keyExtractor={item => item.title.toString()}
        />
      )}
    </View>
  );
};

export default SlidableBanner;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {},
  });
