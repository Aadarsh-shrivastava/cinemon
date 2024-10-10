import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';

interface LoggerProps {
  item: any;
}
const Logger = ({item}: LoggerProps) => {
  const {theme, toggleTheme} = useTheme();
  return (
    <View style={styles(theme).container}>
      <Text style={{color: theme.colors.foreground}}>
        {JSON.stringify(item)}
      </Text>
    </View>
  );
};

export default Logger;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {},
  });
