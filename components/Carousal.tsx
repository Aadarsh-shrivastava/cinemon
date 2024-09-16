import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
import VerticalMovieCard from './VerticalMovieCard';

interface CarousalProps<T> {
  renderChild: (item: T) => JSX.Element;
  data: T[];
  onPress?: () => void;
}
const Carousal = <T,>({renderChild, data, onPress}: CarousalProps<T>) => {
  const {theme, toggleTheme} = useTheme();
  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).carousal}>
        <FlatList
          contentContainerStyle={{gap: theme.spacing.m}}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity onPress={onPress}>
              {renderChild(item)}
            </TouchableOpacity>
          )}
          keyExtractor={index => Math.random().toString() + index}
        />
      </View>
    </View>
  );
};

export default Carousal;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {},
    carousal: {flexDirection: 'row', padding: theme.spacing.sm},
  });
