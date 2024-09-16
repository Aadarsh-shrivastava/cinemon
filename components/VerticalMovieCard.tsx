import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabParamList} from 'navigation/BottomNavigation';
import {useNavigation} from '@react-navigation/native';
import {MovieStackParamList} from 'navigation/MovieStackNavigator';

type VerticalMovieCardNavigarionProp = StackNavigationProp<MovieStackParamList>;
interface VerticalMovieCardProps {
  height?: number;
  width?: number;
}
const VerticalMovieCard = ({height, width}: VerticalMovieCardProps) => {
  const {theme, toggleTheme} = useTheme();
  const navigation = useNavigation<VerticalMovieCardNavigarionProp>();
  return (
    <View style={styles(theme).container}>
      <ImageBackground
        source={{
          uri: 'https://i.etsystatic.com/37166133/r/il/60f034/4087791906/il_570xN.4087791906_jcbj.jpg',
        }}
        style={styles(theme, width, height).BackgroundImage}
        imageStyle={styles(theme).image}
        resizeMode="cover"
      />
      <Text style={styles(theme).title}>Movie</Text>
    </View>
  );
};

export default VerticalMovieCard;

const styles = (theme: Theme, width: number = 9, height: number = 12) =>
  StyleSheet.create({
    container: {},
    BackgroundImage: {
      height: theme.size.m * height,
      width: theme.size.m * width,
    },
    image: {borderRadius: theme.spacing.m},
    title: {
      color: theme.colors.foreground,
      margin: theme.spacing.sm,
    },
  });
