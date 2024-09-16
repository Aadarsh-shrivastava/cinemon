import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import BrowserScreen from '../screens/BrowserScreen/BrowserScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import DiscoverScreen from '../screens/DiscoverScreen/DiscoverScreen';
import {useTheme} from '../contexts/themeContext';
import Icon from '../Icon';
import Header from 'components/Header';
import MovieScreen from '../screens/MovieScreen/MovieScreen';
import MovieStackNavigator, {MovieStackParamList} from './MovieStackNavigator';
import BrowserStackNavigator from './BrowserStack';
import HomeStackNavigator from './HomeStack';

export type BottomTabParamList = {
  HomeStack: undefined;
  BrowserStack: undefined;
  DiscoverStack: undefined;
  ProfileStack: undefined;
  MovieStack: undefined;
};
const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  const {theme, toggleTheme} = useTheme();
  return (
    <BottomTab.Navigator
      screenOptions={{
        // headerShown: false,
        header: () => <Header />,
        tabBarStyle: {
          height: theme.size.xl * 2,
          backgroundColor: theme.colors.black,
          padding: theme.spacing.m,
        },
        tabBarLabelStyle: {color: theme.colors.background},
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
      }}>
      <BottomTab.Screen
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: () => (
            <Icon
              name={'home'}
              type={'MaterialIcons'}
              color={theme.colors.background}
              size={theme.size.xl}
            />
          ),
        }}
        name="HomeStack"
        component={HomeStackNavigator}
      />
      <BottomTab.Screen
        name="BrowserStack"
        options={{
          headerShown: false,
          title: 'Browser',
          tabBarIcon: () => (
            <Icon
              name={'search'}
              type={'MaterialIcons'}
              color={theme.colors.background}
            />
          ),
        }}
        component={BrowserStackNavigator}
      />

      <BottomTab.Screen
        name="DiscoverStack"
        options={{
          title: 'Discover',
          tabBarIcon: () => (
            <Icon
              name={'movie-outline'}
              type={'MaterialCommunityIcons'}
              color={theme.colors.background}
            />
          ),
        }}
        component={DiscoverScreen}
      />
      <BottomTab.Screen
        name="ProfileStack"
        options={{
          title: 'Profile',
          tabBarIcon: () => (
            <Icon
              name={'person-outline'}
              type={'MaterialIcons'}
              color={theme.colors.background}
            />
          ),
        }}
        component={ProfileScreen}
      />
      {/* <BottomTab.Screen
        name="MovieStack"
        options={{headerShown: false, tabBarButton: () => null}}
        component={MovieStackNavigator}
      /> */}
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
