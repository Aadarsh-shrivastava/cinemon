import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
import Icon from '../../../Icon';

interface SearchBarProps {}
const SearchBar = ({}: SearchBarProps) => {
  const {theme, toggleTheme} = useTheme();
  return (
    <View style={styles(theme).container}>
      <Icon style={styles(theme).leftIcon} name="search" type="MaterialIcons" />
      <Text style={styles(theme).label}> Search</Text>
    </View>
  );
};

export default SearchBar;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: theme.colors.inactive,
      height: theme.size.l * 2,
      margin: theme.spacing.m,
      borderRadius: theme.spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
    },
    leftIcon: {margin: theme.spacing.s},
    label: {
      color: theme.colors.inactive,
      fontSize: theme.size.ml,
      margin: theme.spacing.s,
    },
  });
