import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
interface ChipProps {
  label: string;
  isSelected: boolean;
}
const Chip = ({label, isSelected}: ChipProps) => {
  const {theme, toggleTheme} = useTheme();
  return (
    <View
      style={[
        styles(theme).container,
        isSelected ? {backgroundColor: theme.colors.primary} : {},
      ]}>
      <Text
        style={[
          styles(theme).label,
          isSelected ? {color: theme.colors.white} : {},
        ]}>
        {label}
      </Text>
    </View>
  );
};

export default React.memo(Chip);

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: theme.colors.primary,
      alignSelf: 'flex-start',
      padding: theme.spacing.s,
      minWidth: 93,
      alignItems: 'center',
      borderRadius: theme.size.sm,
    },
    label: {color: theme.colors.primary},
  });
