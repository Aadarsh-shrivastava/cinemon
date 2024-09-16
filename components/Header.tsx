import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from '../contexts/themeContext';
import Icon from '../Icon';

const Header = () => {
  const {theme, toggleTheme} = useTheme();
  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).title}>IMDB</Text>
      <Icon name={'notifications'} type={'MaterialIcons'} size={24} />
    </View>
  );
};

export default Header;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingTop: theme.spacing.xl * 2,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.ml,
    },
    title: {
      color: theme.colors.foreground,
      fontWeight: 'heavy',
      fontSize: theme.size.ml,
      fontFamily: theme.textVariants.header.fontFamily,
    },
    rightIcon: {},
  });
