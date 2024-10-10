import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import Banner from 'components/Banner';
import Button from 'components/Button';
import ThumbNail from 'components/ThumbNail';
import SectionHeader from 'components/SectionHeader';
import RatingCard from 'components/RatingCard';
import VerticalMovieCard from 'components/VerticalMovieCard';
import Icon from '../../Icon';
import {StackScreenProps} from '@react-navigation/stack';
import {MovieStackParamList} from 'navigation/MovieStackNavigator';
import Carousal from 'components/Carousal';
import useButtonBar, {button} from '../../hooks/useButtonBar';
import useApi from '../../hooks/useApi';
import {Section, movie_detail, thumbnail} from 'types';
import Logger from 'components/Logger';
import {useDispatch} from 'react-redux';
import {addToWatchList} from 'redux/watchlistAction';

type MovieScreenProps = StackScreenProps<MovieStackParamList, 'MovieScreen'>;
const MovieScreen = ({navigation, route}: MovieScreenProps) => {
  const {theme, toggleTheme} = useTheme();
  const {tmdbId} = route.params;
  const dispatch = useDispatch();

  const {
    data: movie,
    isLoading,
    error,
  }: {data: movie_detail; isLoading: boolean; error: any} = useApi(
    `/3/movie/${tmdbId}?language=en-US`,
    'GET',
    'movei_details',
  );

  const handleAddToWatchList = () => {
    dispatch(addToWatchList(movie));
  };
  const {
    data: reviews,
    isLoading: isReviewLoading,
    error: errorInReviewFetching,
  }: {data: any; isLoading: boolean; error: any} = useApi(
    `/3/movie/${tmdbId}/reviews`,
    'GET',
    'movie_reviews',
  );

  const {
    data: movie_images,
    isLoading: isImagesLoading,
    error: errorInImagesFetching,
  } = useApi(`/3/movie/${tmdbId}/images`, 'GET', 'movie_images' + tmdbId);

  const {data: recommendedMovies, isLoading: isRecommendationLoading} = useApi(
    `/3/movie/${tmdbId}/recommendations`,
    'GET',
    'recommendations' + tmdbId,
  );

  const firstButtons: button[] = [
    {
      label: 'Rating',
      onPress: () => navigation.push('RatingScreen', {tmdbId: tmdbId}),
    },
    {
      label: 'Guide',
      onPress: () => navigation.push('GuideScreen', {tmdbId}),
    },
    {
      label: 'Awards',
      onPress: () => navigation.push('AwardScreen', {tmdbId}),
    },
    {
      label: 'Cast',
      onPress: () => navigation.push('CastScreen', {tmdbId}),
    },
  ];

  const secondButtons: button[] = [
    {
      label: 'Wishlist',
      leftIcon: <Icon name="add" type="MaterialIcons" size={20} />,
      onPress: handleAddToWatchList,
    },
    {
      label: 'Set Reminder',
      leftIcon: <Icon name="alarm" type="MaterialIcons" size={20} />,
    },
  ];

  const {ButtonBar: FirstButtonBar} = useButtonBar({
    buttons: firstButtons,
    buttonsStyle: {backgroundColor: theme.colors.inactive, borderRadius: 10},
    paddingHorizontal: 5,
    containerStyle: {margin: 10},
  });

  const {ButtonBar: SecondButtonBar} = useButtonBar({
    buttons: secondButtons,
    paddingHorizontal: 4,
    buttonsStyle: {
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
    },
    containerStyle: {margin: 5},
  });

  const section: Section[] = [
    {
      title: '',
      data: [
        movie_images ? (movie_images.backdrops.slice(0, 6) as thumbnail[]) : [],
      ],
      component: ThumbNail,
    },
    {
      title: 'Ratings & Reviews',
      data: [reviews ? reviews.results.slice(0, 10) : []],
      component: RatingCard,
    },
    {
      title: 'You might also like',
      data: [recommendedMovies ? recommendedMovies.results.slice(0, 5) : []],
      component: VerticalMovieCard,
      onPress: (id: number) => navigation.push('MovieScreen', {tmdbId: id}),
    },
  ];

  return (
    <View style={styles(theme).container}>
      <StatusBar barStyle={'light-content'} />
      {isLoading || isReviewLoading || isImagesLoading ? (
        <ActivityIndicator />
      ) : (
        <SectionList
          sections={section}
          renderSectionHeader={({section}) =>
            section.title ? (
              <SectionHeader
                sectionTitle={section.title}
                actionTitle={''}
                onPress={() => {}}
              />
            ) : null
          }
          ListHeaderComponent={() => (
            <View>
              <Banner
                height={13}
                PosterUrl={movie.poster_path}
                title={movie.title}
                overView={movie.overview}
              />

              <FirstButtonBar />
              <SecondButtonBar />
            </View>
          )}
          renderItem={({item, section}) => (
            <Carousal
              // onPress={section.onPress ? section.onPress : () => {}}
              data={item}
              renderChild={dataitem => (
                <section.component item={dataitem} onPress={section.onPress} />
              )}
            />
          )}
        />
      )}
    </View>
  );
};

export default MovieScreen;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {margin: 'auto'},
    buttons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      margin: 'auto',
      gap: 5,
      marginVertical: theme.spacing.m,
    },
  });

const Buttons = ({theme, navigation, width, width2}: any) => {
  return (
    <>
      <View style={styles(theme).buttons}>
        <Button
          color={theme.colors.inactive}
          title={'Rating'}
          width={width}
          onPress={() => navigation.navigate('RatingScreen')}
        />
        <Button
          color={theme.colors.inactive}
          title={'Guide'}
          width={width}
          onPress={() => {}}
        />
        <Button
          color={theme.colors.inactive}
          title={'Awards'}
          width={width}
          onPress={() => {}}
        />
        <Button
          color={theme.colors.inactive}
          title={'Cast'}
          width={width}
          onPress={() => {}}
        />
      </View>
      <View style={styles(theme).buttons}>
        <Button
          onPress={() => {}}
          title={'Wishlist'}
          width={width2}
          leftIcon={() => (
            <Icon name={'add'} type={'MaterialIcons'} size={24} />
          )}
        />
        <Button
          onPress={() => {}}
          title={'Set Reminder'}
          width={width2}
          leftIcon={() => (
            <Icon name={'alarm'} type={'MaterialIcons'} size={24} />
          )}
        />
      </View>
    </>
  );
};

// const MovieScreen = () => {
//   return <></>;
// };
// export default MovieScreen;
