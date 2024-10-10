import {
  ScrollView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {Theme, useTheme} from '../../contexts/themeContext';
import Banner from '../../components/Banner';
import Carousal from 'components/Carousal';
import VerticalMovieCard from 'components/VerticalMovieCard';
import SectionHeader from 'components/SectionHeader';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList} from 'navigation/HomeStack';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {movieItem} from 'types';
import SlidableBanner from 'components/SlidableBanner';
import useApi from '../../hooks/useApi';
import useInfiniteApi from 'hooks/useInfiniteApi';
import VerticalMovieCardLoader from 'components/Loaders/VerticalMovieCardLoader';

type HomeScreenNavigationProps = StackNavigationProp<
  HomeStackParamList,
  'HomeScreen'
>;
const HomeScreen = () => {
  const {theme, toggleTheme} = useTheme();
  const navigation = useNavigation<HomeScreenNavigationProps>();

  const {
    data: top_ten_movies,
    isLoading: isLoadingPopular,
    fetchNextPage: fetchNextPopular,
  } = useInfiniteApi('/3/movie/popular', 'GET', 'top_ten_movies');

  const {
    data: upcomingMovies,
    isLoading: isLoadingUpcoming,
    error,
    fetchNextPage: fetchNextUpcoming,
  } = useInfiniteApi('/3/movie/upcoming', 'GET', 'upcoming_movies');

  const {
    data: nowPlaying,
    isLoading: isLoadingNowPlaying,
    fetchNextPage: fetchNextNowPlaying,
  } = useInfiniteApi('/3/movie/now_playing', 'GET', 'now_playing');

  const sections: any = [
    {
      title: 'Top 10 Movies for you',
      fetchNext: fetchNextPopular,
      isLoading: isLoadingPopular,
      data: [
        top_ten_movies
          ? top_ten_movies.pages.flatMap(page => page.results)
          : [],
      ],
      placeholder: VerticalMovieCardLoader,
    },
    {
      title: 'Upcoming movie',
      fetchNext: fetchNextUpcoming,
      isloading: isLoadingUpcoming,
      data: [
        upcomingMovies
          ? upcomingMovies.pages.flatMap(page => page.results)
          : [],
      ],
      placeholder: VerticalMovieCardLoader,
    },
    {
      title: 'Now Playing',
      fetchNext: fetchNextNowPlaying,
      isLoading: true,
      data: [nowPlaying ? nowPlaying.pages.flatMap(page => page.results) : []],
      placeholder: () => <Text>{isLoadingNowPlaying.toString()}</Text>,
    },
  ];

  return (
    <View style={styles(theme).container}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />

      <SectionList
        ListHeaderComponent={() => (
          <View>
            <SlidableBanner />
          </View>
        )}
        sections={sections}
        renderItem={({item, section}: {item: movieItem[]; section: any}) => (
          <Carousal
            onEndReached={section.fetchNext}
            data={item}
            renderChild={
              section.isloading
                ? () => <section.placeholder />
                : (dataitem: movieItem) => (
                    <VerticalMovieCard
                      item={dataitem}
                      onPress={(id: number) =>
                        navigation.push('MovieStack', {tmdbId: id})
                      }
                    />
                  )
            }
          />
        )}
        showsHorizontalScrollIndicator={false}
        renderSectionHeader={({section}) => (
          <SectionHeader
            sectionTitle={section.title}
            actionTitle={'See More'}
            onPress={() => {}}
          />
        )}
        // keyExtractor={(item, index) => item.toString()}
        contentContainerStyle={{paddingBottom: theme.spacing.xl * 2}}
      />
    </View>
  );
};

export default HomeScreen;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {},
  });
