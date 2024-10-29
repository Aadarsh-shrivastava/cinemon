import {createStackNavigator} from '@react-navigation/stack';
import MovieScreen from '../screens/MovieScreen/MovieScreen';
import AuthScreen from '../screens/ProfileScreen/AuthScreen';
import Header from 'components/Header';
import Icon from '../Icon';
import {theme} from '../theme';
import MovieStackNavigator from './MovieStackNavigator';

export type AuthStackParamList = {
  AuthScreen: undefined;
  //   AuthScreen: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <>
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{
            header: () => <Header />,
          }}
          name="AuthScreen"
          component={AuthScreen}
        />
      </AuthStack.Navigator>
    </>
  );
};

export default AuthStackNavigator;
