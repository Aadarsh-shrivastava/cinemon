import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import React from 'react';
import BottomTabNavigator from './BottomNavigation';
import {theme} from 'theme';
import {useTheme} from 'contexts/themeContext';

const Router = () => {
  const {theme, toggleTheme} = useTheme();
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: theme.colors.primary,
          background: theme.colors.background,
        },
      }}>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};

export default Router;
