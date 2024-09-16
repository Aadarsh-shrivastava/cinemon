import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import Router from './navigation/Router';
import {ThemeProvider} from './contexts/themeContext';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <StatusBar barStyle={'dark-content'} />
      <Router />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
