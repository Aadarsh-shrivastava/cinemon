import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import BottomTabNavigator from './BottomNavigation';

const Router = () => {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};

export default Router;
