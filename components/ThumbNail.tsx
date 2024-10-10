import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
import {thumbnail} from 'types';
import Logger from './Logger';

const uri =
  'https://images-cdn.ubuy.co.in/634ffe4b05d16a708944a5ec-avengers-endgame-movie-poster-2-sided.jpg';

interface ThumbNailProps {
  item?: thumbnail;
  onPress?: any;
}
const ThumbNail = ({item, onPress}: ThumbNailProps) => {
  const {theme, toggleTheme} = useTheme();
  console.log('https://image.tmdb.org/t/p/w500' + item?.file_path);
  return (
    <>
      <ImageBackground
        source={{
          uri: 'http://image.tmdb.org/t/p/w500' + item?.file_path,
        }}
        resizeMode="cover"
        resizeMethod="auto"
        style={styles(theme).backgrounditem}
      />
    </>
  );
};

export default ThumbNail;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {},
    backgrounditem: {
      width: theme.size.xl * 7,
      height: theme.size.xl * 4,
      justifyContent: 'flex-end',
      elevation: 8,
      borderColor: 'black',
      padding: theme.spacing.s,
    },
  });
