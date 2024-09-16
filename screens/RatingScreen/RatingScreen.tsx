import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';

interface RatingScreenProps {}
const RatingScreen = ({}: RatingScreenProps) => {
  const {theme, toggleTheme} = useTheme();
  return <View style={styles(theme).container}></View>;
};

export default RatingScreen;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {},
  });
