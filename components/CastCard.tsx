import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
import {Cast} from 'types';

interface CastCardProps {
  item: Cast | null | undefined;
}
const CastCard = ({item}: CastCardProps) => {
  const {theme, toggleTheme} = useTheme();
  return (
    <View style={styles(theme).container}>
      <Image
        style={styles(theme).card}
        source={{uri: 'http://image.tmdb.org/t/p/w500/' + item?.profile_path}}
        height={100}
        width={100}
      />
      <Text style={styles(theme).text}>{item?.name}</Text>
    </View>
  );
};

export default CastCard;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {},
    card: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.foreground,
    },
    text: {maxWidth: 100, color: theme.colors.foreground},
  });
