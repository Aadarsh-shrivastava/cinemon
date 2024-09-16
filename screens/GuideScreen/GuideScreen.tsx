import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';

interface GuideScreenProps {}
const GuideScreen = ({}: GuideScreenProps) => {
  const {theme, toggleTheme} = useTheme();
  return <View style={styles(theme).container}></View>;
};

export default GuideScreen;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {},
  });
