import {
  ActivityIndicator,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
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
import {useDispatch} from 'react-redux';
import {addToWatchList, removeFromWatchList} from 'redux/watchlistAction';
import useAuth from 'contexts/authContext';
import {
  getWatchList,
  isWatchListed,
  addMovieToWatchlist,
  removeMovieFromWatchlist,
} from '../../firebase/firestore/watchList';
import CustomBanner from 'components/BannerCustom';
import CustomLoader from 'components/Loaders/CustomLoader';
import {FAB, PaperProvider} from 'react-native-paper';

type MovieScreenProps = StackScreenProps<MovieStackParamList, 'MovieScreen'>;
const MovieScreen = ({navigation, route}: MovieScreenProps) => {
  const {theme, toggleTheme} = useTheme();
  const {tmdbId} = route.params;
  const dispatch = useDispatch();
  const {user} = useAuth();
  const [isWatchListedState, setIsWatchListedState] = useState<boolean>(false);

  isWatchListed(user?.uid, tmdbId.toString())
    .then(b => {
      setIsWatchListedState(b);
      console.log(b);
    })
    .catch(e =>
      console.log(`something wnet wrong with watchlist checking function`),
    );
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
    // dispatch(addToWatchList(movie));
    isWatchListedState
      ? removeMovieFromWatchlist(user?.uid ?? '', movie.id.toString()).then(d =>
          setIsWatchListedState(false),
        )
      : addMovieToWatchlist(user?.uid ?? '', movie).then(d =>
          setIsWatchListedState(true),
        );
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
      label: 'Video',
      onPress: () => navigation.push('VideoScreen', {tmdbId}),
    },

    {
      label: 'Cast',
      onPress: () => navigation.push('CastScreen', {tmdbId}),
    },
  ];

  const secondButtons: button[] = [
    {
      label: isWatchListedState ? 'Remove' : 'Watchhlist',
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

  const section: any[] = [
    {
      title: '',
      data: [
        movie_images ? (movie_images.backdrops.slice(0, 6) as thumbnail[]) : [],
      ],
      isLoading: isReviewLoading,
      loader: <CustomLoader height={6} width={10} radius={0} />,
      component: ThumbNail,
    },
    {
      title: 'Ratings & Reviews',
      data: [reviews ? reviews.results.slice(0, 10) : []],
      isLoading: isImagesLoading,
      loader: <CustomLoader height={6} width={10} radius={0} />,
      component: RatingCard,
    },
    {
      title: 'You might also like',
      data: [recommendedMovies ? recommendedMovies.results.slice(0, 5) : []],
      isLoading: isRecommendationLoading,
      loader: <CustomLoader height={6} width={10} radius={0} />,
      component: VerticalMovieCard,
      onPress: (id: number) => navigation.push('MovieScreen', {tmdbId: id}),
    },
  ];

  return (
    <View style={styles(theme).container}>
      <StatusBar barStyle={'light-content'} />
      <View
        style={{
          alignItems: 'center',
          position: 'absolute',
          bottom: 10,
          borderRadius: 50,
          right: 10,
          zIndex: 10,
        }}>
        <Icon
          style={{
            elevation: 7,
            width: 60,
            borderRadius: 50,
            borderColor: 'black',
          }}
          name="arrow-right-drop-circle"
          type="MaterialCommunityIcons"
          size={60} // Set a suitable size for the icon
          color={theme.colors.primary} // Icon color
          onPress={() => navigation.push('StreamScreen', {tmdbId: tmdbId})}
        />
        <Text style={{color: theme.colors.primary}}>Watch Now</Text>
      </View>
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
              <CustomBanner
                Movie={movie}
                height={10}
                PosterUrl={movie.poster_path}>
                <CustomBanner.Title
                  title={movie.title ?? ''}></CustomBanner.Title>
                <CustomBanner.Description
                  description={movie.overview}></CustomBanner.Description>
              </CustomBanner>

              <FirstButtonBar />
              {user && <SecondButtonBar />}
            </View>
          )}
          renderItem={({item, section}) => (
            <Carousal
              // onPress={section.onPress ? section.onPress : () => {}}
              data={item}
              renderChild={dataitem =>
                section.isLoading ? (
                  section.loader
                ) : (
                  <section.component
                    item={dataitem}
                    onPress={section.onPress}
                  />
                )
              }
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
    container: {padding: 'auto', backgroundColor: theme.colors.background},
    buttons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      margin: 'auto',
      gap: 5,
      marginVertical: theme.spacing.m,
    },
    fab: {
      backgroundColor: '#6200ea', // Adjust this based on your theme
      width: 60,
      height: 60,
      borderRadius: 30, // Circular FAB
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      marginTop: 10, // Space between FAB and text
      fontSize: 16,
      color: '#6200ea', // Match FAB background color or change as per theme
    },
  });

// const MovieScreen = () => {
//   return <></>;
// };
// export default MovieScreen;
