import {createStackNavigator} from '@react-navigation/stack';
import MovieScreen from '../screens/MovieScreen/MovieScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import Header from 'components/Header';
import Icon from '../Icon';
import {theme} from '../theme';
import BrowserScreen from '../screens/BrowserScreen/BrowserScreen';
import MovieStackNavigator from './MovieStackNavigator';
import SearchScreen from '../screens/BrowserScreen/SearchScreen';

export type BrowserStackParamList = {
  BrowserScren: undefined;
  FilterScreen: undefined;
  MovieStack: {tmdbId: number};
  SearchScreen: undefined;
};

const BrowserStack = createStackNavigator<BrowserStackParamList>();

const BrowserStackNavigator = () => {
  return (
    <BrowserStack.Navigator>
      <BrowserStack.Screen
        options={{headerShown: false}}
        name="BrowserScreen"
        component={BrowserScreen}
      />
      <BrowserStack.Screen
        options={{headerShown: false}}
        name="FilterScreen"
        component={BrowserScreen}
      />
      <BrowserStack.Screen
        options={{headerShown: false}}
        name="MovieStack"
        component={MovieStackNavigator}
      />
      <BrowserStack.Screen
        options={{headerShown: false, animationEnabled: false}}
        name="SearchScreen"
        component={SearchScreen}
      />
    </BrowserStack.Navigator>
  );
};

export default BrowserStackNavigator;
