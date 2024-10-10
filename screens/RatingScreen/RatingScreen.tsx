import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
import RatingCard from 'components/RatingCard';
import useApi from '../../hooks/useApi';
import {StackScreenProps} from '@react-navigation/stack';
import {MovieStackParamList} from 'navigation/MovieStackNavigator';
type RatingScreenProps = StackScreenProps<MovieStackParamList, 'RatingScreen'>;
const RatingScreen = ({navigation, route}: RatingScreenProps) => {
  const {theme, toggleTheme} = useTheme();
  const {tmdbId} = route.params;
  const {
    data: reviews,
    isLoading: isReviewLoading,
    error: errorInReviewFetching,
  }: {data: any; isLoading: boolean; error: any} = useApi(
    `/3/movie/${tmdbId}/reviews`,
    'GET',
    'movie_reviews',
  );

  return (
    <View style={styles(theme).container}>
      <FlatList
        contentContainerStyle={{
          gap: theme.spacing.ml,
          margin: theme.spacing.ml,
        }}
        data={reviews ? reviews.results : []}
        renderItem={({item, index}) => (
          <>
            <RatingCard item={item} isLoading={isReviewLoading} width={370} />
          </>
        )}
      />
    </View>
  );
};

export default RatingScreen;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {margin: 'auto'},
  });
