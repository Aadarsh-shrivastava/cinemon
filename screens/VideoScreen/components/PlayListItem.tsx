import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
import {video} from 'types';

interface PlayListItemProps {
  item: video;
}
const PlayListItem = ({item}: PlayListItemProps) => {
  const {theme, toggleTheme} = useTheme();
  return <View style={styles(theme).container}>
    
  </View>;
};

export default PlayListItem;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {},
  });
