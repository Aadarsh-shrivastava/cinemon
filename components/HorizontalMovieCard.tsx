import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';

const HorizontalMovieCard = () => {
  const {theme, toggleTheme} = useTheme();
  return <View style={styles(theme).container}></View>;
};

export default HorizontalMovieCard;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {},
  });
