import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
import {chip} from 'types';
import Chip from 'components/Chip';

const useFilter = (data: chip[]) => {
  const {theme, toggleTheme} = useTheme();
  const [chipData, setChipData] = useState<chip[]>(data);

  const FilterBar = () => {
    // const debounce = (func: Function, delay: number) => {
    //   let timeoutId: NodeJS.Timeout;
    //   return (...args: any[]) => {
    //     clearTimeout(timeoutId);
    //     timeoutId = setTimeout(() => func(...args), delay);
    //   };
    // };

    const toggleFilter = (index: number) => {
      setChipData(chipData => {
        return chipData.map((item, ind) =>
          ind == index ? {...item, isSelected: !item.isSelected} : item,
        );
      });
    };

    return (
      <View style={styles(theme).container}>
        <FlatList
          data={chipData}
          horizontal
          contentContainerStyle={{gap: theme.spacing.s}}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={item.label}
              onPress={() => {
                toggleFilter(index);
              }}>
              <Chip
                key={item.label}
                label={item.label}
                isSelected={item.isSelected}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };
  return {FilterBar, chipData};
};

export default useFilter;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignSelf: 'center',
      flexDirection: 'row',
      // flexWrap: 'wrap',
      justifyContent: 'flex-start',
      gap: theme.spacing.s,
      padding: theme.spacing.s,
    },
  });
