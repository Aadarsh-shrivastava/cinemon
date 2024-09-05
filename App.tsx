import React from 'react';
import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return <SafeAreaView></SafeAreaView>;
}

const styles = StyleSheet.create({});

export default App;
