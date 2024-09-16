import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';

interface SectionHeaderProps {
  sectionTitle: string;
  actionTitle: string;
  onPress: () => void;
}
const SectionHeader = ({
  sectionTitle,
  actionTitle,
  onPress,
}: SectionHeaderProps) => {
  const {theme, toggleTheme} = useTheme();
  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).sectionTitle}>{sectionTitle}</Text>
      <Text onPress={onPress} style={styles(theme).actionTitle}>
        {actionTitle}
      </Text>
    </View>
  );
};

export default SectionHeader;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: theme.spacing.m,
    },
    sectionTitle: {
      color: theme.colors.foreground,
      fontWeight: 'bold',
      fontSize: theme.size.m,
    },
    actionTitle: {color: theme.colors.primary, fontSize: theme.size.m},
  });
