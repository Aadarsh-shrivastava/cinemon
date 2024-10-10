import {createStackNavigator} from '@react-navigation/stack';
import MovieScreen from '../screens/MovieScreen/MovieScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import Header from 'components/Header';
import Icon from '../Icon';
import {theme} from '../theme';
import MovieStackNavigator from './MovieStackNavigator';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

export type HomeStackParamList = {
  HomeScreen: undefined;
  MovieStack: {tmdbId: number};
  FilterScreen: undefined;
};

const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <>
      <HomeStack.Navigator>
        <HomeStack.Screen
          options={{
            header: () => <Header />,
          }}
          name="HomeScreen"
          component={HomeScreen}
        />
        <HomeStack.Screen
          options={{headerShown: false}}
          name="MovieStack"
          component={MovieStackNavigator}
        />
      </HomeStack.Navigator>
    </>
  );
};

export default HomeStackNavigator;
