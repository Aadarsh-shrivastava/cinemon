import {createStackNavigator} from '@react-navigation/stack';
import MovieScreen from '../screens/MovieScreen/MovieScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import Header from 'components/Header';
import Icon from '../Icon';
import {theme} from '../theme';
import BrowserScreen from '../screens/BrowserScreen/BrowserScreen';
import MovieStackNavigator from './MovieStackNavigator';

export type BrowserStackParamList = {
  BrowserScren: undefined;
  MovieStack: undefined;
  FilterScreen: undefined;
};

const BrowserStack = createStackNavigator<BrowserStackParamList>();

const BrowserStackNavigator = () => {
  return (
    <BrowserStack.Navigator>
      <BrowserStack.Screen
        options={{headerShown: false}}
        name="BrowserScren"
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
    </BrowserStack.Navigator>
  );
};

export default BrowserStackNavigator;
