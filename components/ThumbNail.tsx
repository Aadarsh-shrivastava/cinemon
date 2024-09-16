import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';

const uri =
  'https://static1.cbrimages.com/wordpress/wp-content/uploads/2019/04/Avengers-Endgame-banner-poster.jpg';

interface ThumbNailProps {}
const ThumbNail = ({}: ThumbNailProps) => {
  const {theme, toggleTheme} = useTheme();

  return (
    <ImageBackground
      source={{uri: uri}}
      resizeMode="cover"
      resizeMethod="auto"
      style={styles(theme).backgroundImage}
    />
  );
};

export default ThumbNail;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {},
    backgroundImage: {
      width: theme.size.xl * 7,
      height: theme.size.xl * 4,
      justifyContent: 'flex-end',
      padding: theme.spacing.s,
    },
  });
