import {createStackNavigator} from '@react-navigation/stack';
import MovieScreen from '../screens/MovieScreen/MovieScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import Header from 'components/Header';
import Icon from '../Icon';
import {theme} from '../theme';
import AwardScreen from '../screens/AwardScreen/AwardScreen';
import CastScreen from '../screens/CastScreen/CastScreen';
import RatingScreen from '../screens/RatingScreen/RatingScreen';
import GuideScreen from '../screens/GuideScreen/GuideScreen';
import VideoScreen from '../screens/VideoScreen/VideoScreen';
import StreamScreen from '../screens/VideoScreen/StreamScreen';

export type MovieStackParamList = {
  MovieScreen: {tmdbId: number};
  RatingScreen: {tmdbId: number};
  VideoScreen: {tmdbId: number};
  CastScreen: {tmdbId: number};
  AwardScreen: {tmdbId: number};
  StreamScreen: {tmdbId: number};
};

const MovieStack = createStackNavigator<MovieStackParamList>();

const MovieStackNavigator = ({route}: {route: any}) => {
  const {tmdbId} = route.params;
  return (
    <MovieStack.Navigator>
      <MovieStack.Screen
        options={{headerShown: false}}
        name="MovieScreen"
        initialParams={{tmdbId}}
        component={MovieScreen}
      />
      <MovieStack.Screen
        options={{
          headerStyle: {backgroundColor: theme.colors.primary},
          title: 'Rating & Review',
          headerLeft: () => <Icon name="chevron-left" type="MaterialIcons" />,
        }}
        name="RatingScreen"
        component={RatingScreen}
        initialParams={{tmdbId}}
      />
      <MovieStack.Screen
        options={{
          headerStyle: {backgroundColor: theme.colors.primary},
          headerLeft: () => <Icon name="chevron-left" type="MaterialIcons" />,
        }}
        name="AwardScreen"
        component={AwardScreen}
        initialParams={{tmdbId}}
      />
      <MovieStack.Screen
        options={{
          headerStyle: {backgroundColor: theme.colors.primary},
          headerLeft: () => <Icon name="chevron-left" type="MaterialIcons" />,
        }}
        name="CastScreen"
        component={CastScreen}
        initialParams={{tmdbId}}
      />
      <MovieStack.Screen
        options={{
          headerStyle: {backgroundColor: theme.colors.primary},
          // headerShown: false,
          headerLeft: () => <Icon name="chevron-left" type="MaterialIcons" />,
        }}
        name="VideoScreen"
        component={VideoScreen}
        initialParams={{tmdbId}}
      />
      <MovieStack.Screen
        options={{
          headerStyle: {backgroundColor: theme.colors.primary},
          headerShown: false,
          headerLeft: () => <Icon name="chevron-left" type="MaterialIcons" />,
        }}
        name="StreamScreen"
        component={StreamScreen}
        initialParams={{tmdbId}}
      />
    </MovieStack.Navigator>
  );
};

export default MovieStackNavigator;
