import {createStackNavigator} from '@react-navigation/stack';
import MovieScreen from '../screens/MovieScreen/MovieScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import Header from 'components/Header';
import Icon from '../Icon';
import {theme} from '../theme';
import MovieStackNavigator from './MovieStackNavigator';

export type ProfileStackParamList = {
  ProfileScreen: undefined;
  //   AuthScreen: undefined;
  MovieStack: {tmdbId: number};
};

const ProfileStack = createStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator = () => {
  return (
    <>
      <ProfileStack.Navigator>
        <ProfileStack.Screen
          options={{
            header: () => <Header />,
          }}
          name="ProfileScreen"
          component={ProfileScreen}
        />
        <ProfileStack.Screen
          options={{headerShown: false}}
          name="MovieStack"
          component={MovieStackNavigator}
        />
      </ProfileStack.Navigator>
    </>
  );
};

export default ProfileStackNavigator;
