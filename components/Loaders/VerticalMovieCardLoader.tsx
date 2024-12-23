import React, {useReducer} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Skeleton} from 'moti/skeleton';
import {MotiView} from 'moti';
import {Theme, useTheme} from 'contexts/themeContext';

const VerticalMovieCardLoader = () => {
  const [dark, toggle] = useReducer(s => !s, false);
  const {theme, toggleTheme} = useTheme();
  const colorMode = dark ? 'dark' : 'light';
  return (
    <>
      <MotiView
        transition={{
          type: 'timing',
        }}
        style={[styles(theme).container, styles(theme).BackgroundImage]}
        animate={{backgroundColor: dark ? '#000000' : 'transparent'}}>
        <Skeleton
          colorMode={colorMode}
          radius={25}
          height={theme.size.m * 12}
          width={theme.size.m * 9}
        />
        <Spacer />
      </MotiView>
    </>
  );
};
const Spacer = ({height = 16}) => <View style={{height}} />;

const styles = (theme: Theme, width: number = 9, height: number = 12) =>
  StyleSheet.create({
    shape: {
      justifyContent: 'center',
      height: 250,
      width: 250,
      borderRadius: 25,
      marginRight: 10,
      backgroundColor: 'white',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    padded: {
      padding: 16,
    },
    BackgroundImage: {
      height: theme.size.m * height,
      width: theme.size.m * width,
    },
    image: {borderRadius: theme.spacing.m},
    title: {
      color: theme.colors.foreground,
      margin: theme.spacing.sm,
      width: theme.size.m * width,
    },
  });

export default VerticalMovieCardLoader;
