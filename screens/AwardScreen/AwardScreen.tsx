import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';

interface AwardScreenProps {}
const AwardScreen = ({}: AwardScreenProps) => {
  const {theme, toggleTheme} = useTheme();
  return <View style={styles(theme).container}></View>;
};

export default AwardScreen;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {},
  });
