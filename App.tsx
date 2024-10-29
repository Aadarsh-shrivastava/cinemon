import 'react-native-reanimated';
import 'react-native-gesture-handler';
import React, {useContext, useEffect, useState} from 'react';
import {
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import Router from './navigation/Router';
import {ThemeProvider} from './contexts/themeContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import 'react-native-devsettings';
import 'react-native-devsettings/withAsyncStorage';
import auth from '@react-native-firebase/auth';
import {AuthProvider} from 'contexts/authContext';

const queryClient = new QueryClient();
function App(): React.JSX.Element | null {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <StatusBar barStyle={'dark-content'} />
            <Router />
          </QueryClientProvider>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
