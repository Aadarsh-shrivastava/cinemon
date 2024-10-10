import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import React from 'react';
import BottomTabNavigator from './BottomNavigation';

const Router = () => {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: 'white',
        },
      }}>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};

export default Router;
