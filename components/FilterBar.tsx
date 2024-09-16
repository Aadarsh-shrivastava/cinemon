import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
import Chip from './Chip';
import {chip} from 'types';

interface FilterBarProps {
  data: chip[];
}
const FilterBar = ({data}: FilterBarProps) => {
  const {theme, toggleTheme} = useTheme();
  const [chipData, setChipData] = useState<chip[]>(data);
  const toggleFilter = (index: number) => {
    setChipData(chipData => {
      return chipData.map((item, ind) =>
        ind == index ? {...item, isSelected: !item.isSelected} : item,
      );
    });
  };
  return (
    <View style={styles(theme).container}>
      {data.map(item => (
        <Chip
          key={item.label}
          label={item.label}
          isSelected={item.isSelected}
          onPress={() => {}}
        />
      ))}
    </View>
  );
};

export default FilterBar;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignSelf: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      gap: theme.spacing.s,
      padding: theme.spacing.s,
    },
  });
