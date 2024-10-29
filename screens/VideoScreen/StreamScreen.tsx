import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
import {StackScreenProps} from '@react-navigation/stack';
import {MovieStackParamList} from 'navigation/MovieStackNavigator';
import MoviePlayer from 'components/MoviePlayer';

type StreamScreenProps = StackScreenProps<MovieStackParamList, 'VideoScreen'>;
const StreamScreen = ({route}: StreamScreenProps) => {
  const {theme, toggleTheme} = useTheme();
  const {tmdbId} = route.params;
  return (
    <View style={styles(theme).container}>
      <MoviePlayer tmdbId={tmdbId.toString()} />
    </View>
  );
};

export default StreamScreen;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {height: '100%', width: '100%'},
  });
