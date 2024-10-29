import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {Theme, useTheme} from '../contexts/themeContext';
import Button from './Button';
import {movieItem} from 'types';

interface CustomBannerProps {
  height?: number;
  Movie?: movieItem;
  PosterUrl?: string;
  overView?: string;
  title?: string;
  children: React.ReactNode;
}

const CustomBanner = ({
  height = 10,
  Movie,
  PosterUrl,
  title,
  overView,
  children,
}: CustomBannerProps) => {
  const {theme} = useTheme();
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
        <View style={styles(theme).backgroundImage}>{children}</View>
      </ImageBackground>
    </View>
  );
};

// Subcomponents
CustomBanner.Title = ({title}: {title: string}) => {
  const {theme} = useTheme();
  return <Text style={styles(theme).movieName}>{title}</Text>;
};

CustomBanner.Description = ({description}: {description: string}) => {
  const {theme} = useTheme();
  return <Text style={styles(theme).movieDescription}>{description}</Text>;
};

CustomBanner.Button = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  const {theme} = useTheme();
  return (
    <Button barStyle={styles(theme).button} title={title} onPress={onPress} />
  );
};

export default CustomBanner;

const styles = (theme: Theme, height: number = 10) =>
  StyleSheet.create({
    container: {backgroundColor: theme.colors.black},
    backgroundImage: {
      height: theme.size.xl * height,
      justifyContent: 'flex-end',
      gap: 10,
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
      margin: 10,
    },
    button: {
      margin: 10,
    },
  });
