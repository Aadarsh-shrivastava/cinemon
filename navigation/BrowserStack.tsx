import {createStackNavigator} from '@react-navigation/stack';
import MovieScreen from '../screens/MovieScreen/MovieScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import Header from 'components/Header';
import Icon from '../Icon';
import BrowserScreen from '../screens/BrowserScreen/BrowserScreen';
import MovieStackNavigator from './MovieStackNavigator';
import SearchScreen from '../screens/BrowserScreen/SearchScreen';
import FilterScreen from '../screens/BrowserScreen/FilterScreen';
import {useTheme} from 'contexts/themeContext';

export type BrowserStackParamList = {
  BrowserScren: undefined;
  FilterScreen: {checked: string; setChecked: (s: string) => void};
  MovieStack: {tmdbId: number};
  SearchScreen: undefined;
};

const BrowserStack = createStackNavigator<BrowserStackParamList>();

const BrowserStackNavigator = () => {
  const {theme, toggleTheme} = useTheme();
  return (
    <BrowserStack.Navigator>
      <BrowserStack.Screen
        options={{headerShown: false}}
        name="BrowserScreen"
        component={BrowserScreen}
      />
      <BrowserStack.Screen
        options={{
          headerStyle: {backgroundColor: theme.colors.primary},
          headerLeft: () => (
            <Icon
              name="chevron-left"
              type="MaterialIcons"
              color={theme.colors.background}
            />
          ),
        }}
        name="FilterScreen"
        component={FilterScreen}
        initialParams={{checked: 'None', setChecked: () => {}}}
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
