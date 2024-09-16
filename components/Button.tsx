import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
import Icon from '../Icon';

interface ButtonProps {
  title: string;
  width?: number;
  color?: string;
  onPress: () => void;
  leftIcon?: () => React.ReactNode;
  rightIcon?: () => React.ReactNode;
}
const Button = ({
  title,
  width,
  onPress,
  color,
  leftIcon,
  rightIcon,
}: ButtonProps) => {
  const {theme, toggleTheme} = useTheme();
  return (
    <View style={styles(theme).container}>
      <TouchableOpacity
        style={styles(theme, width, color).button}
        onPress={onPress}>
        <View style={styles(theme).lefIcon}>{leftIcon && leftIcon()}</View>
        <Text style={styles(theme).title}>{title}</Text>
        <View style={styles(theme).lefIcon}>{rightIcon && rightIcon()}</View>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = (
  theme: Theme,
  width: number = 100,
  color: string = theme.colors.primary,
) =>
  StyleSheet.create({
    container: {},
    button: {
      backgroundColor: color,
      padding: theme.spacing.sm,
      borderRadius: theme.spacing.sm,
      // alignSelf: 'flex-start',
      // margin: theme.spacing.s,
      height: theme.size.l * 2,
      flexDirection: 'row',
      justifyContent: 'center',
      width: width,
      alignItems: 'center',
    },
    title: {color: theme.colors.black},
    lefIcon: {marginHorizontal: 'auto'},
  });
