import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {Theme, useTheme} from '../contexts/themeContext';
import Button from './Button';
import {movieItem} from 'types';

interface TaskScreenProps {
  height?: number;
  Movie?: movieItem;
  PosterUrl?: string;
  overView?: string;
  title?: string;
}
const TaskScreen = ({
  height = 10,
  Movie,
  PosterUrl,
  title,
  overView,
}: TaskScreenProps) => {
  const {theme, toggleTheme} = useTheme();
  const {width: screenWidth, height: screenHeight} = useWindowDimensions();

  return (
    <View style={styles(theme).container}>
      <ImageBackground
        resizeMode="cover"
        resizeMethod="auto"
        source={{
          uri:
            `http://image.tmdb.org/t/p/original/` +
            (Movie?.poster_path ?? PosterUrl),
        }}
        imageStyle={{opacity: 0.6}}
        style={[
          styles(theme, height).backgroundImage,
          {width: screenWidth, height: screenHeight / 2.5},
        ]}>
        <View style={styles(theme).backgroundImage}>
          <Text style={styles(theme).movieName}>{Movie?.title ?? title}</Text>
          <Text style={styles(theme).movieDescription}>
            {Movie?.overview ?? overView}
          </Text>
          <Button title={'See More'} onPress={() => {}} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default TaskScreen;

const styles = (theme: Theme, height: number = 10) =>
  StyleSheet.create({
    container: {backgroundColor: theme.colors.black},
    image: {},
    backgroundImage: {
      // width: 'auto',
      height: theme.size.xl * height,
      justifyContent: 'flex-end',
      padding: theme.spacing.s,
    },
    movieName: {
      fontSize: theme.size.m,
      color: theme.colors.primary,
      fontWeight: 'bold',
      marginVertical: theme.spacing.s,
    },
    movieDescription: {
      fontSize: theme.size.m,
      height: theme.size.xl * 2 - 3,
      overflow: 'hidden',
      color: theme.colors.background,
    },
    button: {},
  });
