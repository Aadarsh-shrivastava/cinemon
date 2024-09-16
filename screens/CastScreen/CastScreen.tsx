import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';

interface CastScreenProps {}
const CastScreen = ({}: CastScreenProps) => {
  const {theme, toggleTheme} = useTheme();
  return <View style={styles(theme).container}></View>;
};

export default CastScreen;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {},
  });
