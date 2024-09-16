import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
import {loreum} from 'constants';

interface RatingCardProps {}
const RatingCard = ({}: RatingCardProps) => {
  const {theme, toggleTheme} = useTheme();
  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).heading}>
        <Image
          style={{borderRadius: 100}}
          source={{
            uri: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
          }}
          height={25}
          width={25}
        />
        <Text style={styles(theme).headingTitle}> Jane Alexandaro</Text>
      </View>
      <Text style={styles(theme).ReMark}>Promising</Text>
      <Text style={styles(theme).review}>
        {loreum}
        {loreum}
      </Text>
    </View>
  );
};

export default RatingCard;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: theme.colors.foreground,
      borderRadius: theme.size.m,
      padding: theme.spacing.sm,
      height: theme.size.xxl * 6,
      width: 300,
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
      fontSize: theme.size.m,
    },
    review: {color: theme.colors.foreground},
  });
