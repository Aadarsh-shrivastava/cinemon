import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from '../contexts/themeContext';
import Button from './Button';
const image = {
  uri: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2019/04/Avengers-Endgame-banner-poster.jpg',
};
interface TaskScreenProps {
  height?: number;
}
const TaskScreen = ({height = 10}: TaskScreenProps) => {
  const {theme, toggleTheme} = useTheme();
  return (
    <View style={styles(theme).container}>
      <ImageBackground
        resizeMode="cover"
        resizeMethod="auto"
        source={image}
        imageStyle={{opacity: 0.6}}
        style={styles(theme, height).backgroundImage}>
        <View style={styles(theme).backgroundImage}>
          <Text style={styles(theme).movieName}>Avenger : The Endgame</Text>
          <Text style={styles(theme).movieDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
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
      width: 'auto',
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
      height: theme.size.xl * 2,
      overflow: 'hidden',
    },
    button: {},
  });
