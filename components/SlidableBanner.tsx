import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
import {movieItem, movie_detail} from 'types';
import {useQuery} from '@tanstack/react-query';
import Banner from './Banner';
import useApi from '../hooks/useApi';
import CustomBanner from './BannerCustom';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from 'navigation/HomeStack';
import {useNavigation} from '@react-navigation/native';

type SlidableBannerProps = StackNavigationProp<
  HomeStackParamList,
  'HomeScreen'
>;
const SlidableBanner = ({}: SlidableBannerProps) => {
  const {theme, toggleTheme} = useTheme();
  const navigation = useNavigation<SlidableBannerProps>();
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
          renderItem={({item}: {item: movieItem}) => (
            <CustomBanner Movie={item} height={10} PosterUrl={item.poster_path}>
              <CustomBanner.Title title={item.title ?? ''}></CustomBanner.Title>
              <CustomBanner.Description
                description={item.overview}></CustomBanner.Description>
              <CustomBanner.Button
                title="See More"
                onPress={() => {
                  navigation.push('MovieStack', {tmdbId: item.id});
                }}></CustomBanner.Button>
            </CustomBanner>
          )}
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
