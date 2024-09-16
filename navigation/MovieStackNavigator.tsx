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

export type MovieStackParamList = {
  MovieScreen: undefined;
  RatingScreen: undefined;
  GuideScreen: undefined;
  CastScreen: undefined;
  AwardScreen: undefined;
};

const MovieStack = createStackNavigator<MovieStackParamList>();

const MovieStackNavigator = () => {
  return (
    <MovieStack.Navigator>
      <MovieStack.Screen
        options={{headerShown: false}}
        name="MovieScreen"
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
      />
      <MovieStack.Screen
        options={{
          headerStyle: {backgroundColor: theme.colors.primary},
          headerLeft: () => <Icon name="chevron-left" type="MaterialIcons" />,
        }}
        name="AwardScreen"
        component={AwardScreen}
      />
      <MovieStack.Screen
        options={{
          headerStyle: {backgroundColor: theme.colors.primary},
          headerLeft: () => <Icon name="chevron-left" type="MaterialIcons" />,
        }}
        name="CastScreen"
        component={CastScreen}
      />
      <MovieStack.Screen
        options={{
          headerStyle: {backgroundColor: theme.colors.primary},
          headerLeft: () => <Icon name="chevron-left" type="MaterialIcons" />,
        }}
        name="GuideScreen"
        component={GuideScreen}
      />
    </MovieStack.Navigator>
  );
};

export default MovieStackNavigator;
