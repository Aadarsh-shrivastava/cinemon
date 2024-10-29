import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import {Theme, useTheme} from '../contexts/themeContext';
import Icon from '../Icon';
import useAuth from 'contexts/authContext';

const Header = () => {
  const {theme, toggleTheme} = useTheme();
  const {user} = useAuth();
  const {width, height} = useWindowDimensions();
  return (
    <View style={styles(theme, height).container}>
      <Text style={styles(theme, height).title}>CINEMON</Text>
      {user && (
        <Icon
          name={'notifications'}
          type={'MaterialIcons'}
          size={Math.min(height / 20, 30)}
          color={theme.colors.background}
        />
      )}
    </View>
  );
};

export default Header;

const styles = (theme: Theme, height: number) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingTop: height / 15,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      padding: theme.spacing.ml,
    },
    title: {
      color: theme.colors.background,
      fontWeight: 'heavy',
      fontSize: theme.size.ml,
      fontFamily: theme.textVariants.header.fontFamily,
    },
    rightIcon: {},
  });
