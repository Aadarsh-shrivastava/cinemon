import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
import {Review} from 'types';
import Logger from './Logger';

interface RatingCardProps {
  item: Review;
  isLoading: boolean;
  onPress?: any;
  width?: number;
}
const RatingCard = ({item, isLoading, width}: RatingCardProps) => {
  const {theme, toggleTheme} = useTheme();
  return (
    <>
      <View style={styles(theme, width).container}>
        <View style={styles(theme).heading}>
          {/* <Logger item={item.author_details.avatar_path} /> */}
          <Image
            style={{borderRadius: 100}}
            source={{
              uri: `http://image.tmdb.org/t/p/original${
                item?.author_details.avatar_path ?? ''
              }`,
            }}
            height={25}
            width={25}
          />
          <Text style={styles(theme).headingTitle}>
            {item?.author_details?.name ?? ''}
          </Text>
        </View>
        <Text style={styles(theme).ReMark}>
          {item?.author_details.rating ?? ''}
        </Text>
        <Text style={styles(theme).review}>{item?.content ?? ''}</Text>
      </View>
    </>
  );
};

export default RatingCard;

const styles = (theme: Theme, width = 300) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: theme.colors.foreground,
      borderRadius: theme.size.m,
      padding: theme.spacing.sm,
      height: theme.size.xxl * 6,
      width: width,
      overflow: 'hidden',
    },
    avatar: {borderRadius: 100},
    heading: {flexDirection: 'row'},
    headingTitle: {
      color: theme.colors.foreground,
      marginHorizontal: theme.spacing.s,
      fontWeight: 'bold',
    },
    ReMark: {
      marginVertical: theme.spacing.sm,
      color: theme.colors.foreground,
      fontWeight: 'bold',
      maxWidth: 400,
      fontSize: theme.size.m,
    },
    review: {color: theme.colors.foreground},
  });
