import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from '../../contexts/themeContext';

const TaskScreen = () => {
  const {theme, toggleTheme} = useTheme();
  return <View style={styles(theme).container}></View>;
};

export default TaskScreen;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {},
  });
