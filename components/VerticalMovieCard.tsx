import {
  Image,
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
import {movieItem, movie_detail} from 'types';
import Logger from './Logger';
import {useDispatch} from 'react-redux';
import {addToWatchList} from 'redux/watchlistAction';

type VerticalMovieCardNavigarionProp = StackNavigationProp<MovieStackParamList>;
interface VerticalMovieCardProps {
  height?: number;
  width?: number;
  item?: movieItem | movie_detail;
  onPress?: any;
}
const VerticalMovieCard = ({
  height,
  width,
  item,
  onPress,
}: VerticalMovieCardProps) => {
  const {theme, toggleTheme} = useTheme();
  const navigation = useNavigation<VerticalMovieCardNavigarionProp>();

  return (
    <View style={styles(theme).container}>
      <TouchableOpacity onPress={() => onPress && onPress(item?.id)}>
        <ImageBackground
          source={{
            uri: `http://image.tmdb.org/t/p/w200/` + item?.poster_path,
          }}
          style={styles(theme, width, height).BackgroundImage}
          imageStyle={styles(theme).image}
          resizeMode="cover"
        />
        <Text style={styles(theme).title}>{item?.title ?? '--??--'}</Text>
      </TouchableOpacity>
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
      width: theme.size.m * width,
    },
  });
