import {SectionList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from '../../contexts/themeContext';
import Carousal from 'components/Carousal';
import SectionHeader from 'components/SectionHeader';
import {chip, movieItem} from 'types';
import useFilter from '../../hooks/useFilter';
import VerticalMovieCard from 'components/VerticalMovieCard';
import useApi from '../../hooks/useApi';
import Logger from 'components/Logger';

const TaskScreen = () => {
  const {theme, toggleTheme} = useTheme();
  const {
    data: filters,
    isLoading: isLoadingFilters,
  }: {data: {genres: chip[]}; isLoading: boolean} = useApi(
    '/3/genre/movie/list',
    'GET',
    'filters',
  );

  const {data: top_rated_movies} = useApi(
    '/3/movie/top_rated',
    'GET',
    'top_ten_movies',
  );
  const {data: upcoming_movie} = useApi(
    '/3/movie/upcoming',
    'GET',
    'upcoming_movies',
  );

  const sections = [
    {
      title: 'Top 10 Movies for you',
      data: [
        top_rated_movies
          ? top_rated_movies.results.slice(0, 10)
          : ([] as movieItem[]),
      ],
    },
    {
      title: 'Upcoming movie',
      data: [
        upcoming_movie
          ? upcoming_movie.results.slice(0, 10)
          : ([] as movieItem[]),
      ],
    },
  ];

  // const {FilterBar, chipData} = useFilter(FilterChipsData);
  return (
    <View style={styles(theme).container}>
      <SectionList
        sections={sections}
        renderItem={({item, section}) => (
          <Carousal
            data={item}
            renderChild={(dataitem: movieItem) => (
              <VerticalMovieCard item={dataitem} onPress={() => {}} />
            )}
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
        keyExtractor={(item, index) => item.toString()}
        contentContainerStyle={{paddingBottom: theme.spacing.xl * 2}}
      />
    </View>
  );
};

export default TaskScreen;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {margin: theme.spacing.s},
  });
