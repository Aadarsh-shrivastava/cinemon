import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
import {chip} from 'types';
import Chip from 'components/Chip';

const useFilter = (data: chip[] = []) => {
  const {theme} = useTheme();

  // Initialize chipData with default empty array
  const [chipData, setChipData] = useState<chip[]>([]);

  // Update chipData when data changes
  useEffect(() => {
    if (data && data.length > 0) {
      setChipData(data);
    }
  }, [data]);

  const toggleFilter = (index: number) => {
    setChipData(prevChipData =>
      prevChipData.map((item, ind) =>
        ind === index ? {...item, isSelected: !item.isSelected} : item,
      ),
    );
  };

  const FilterBar = () => (
    <View style={styles(theme).container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={chipData}
        horizontal
        contentContainerStyle={{gap: theme.spacing.s}}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={item.name + item.id}
            onPress={() => toggleFilter(index)}>
            <Chip
              key={item.name}
              label={item.name}
              isSelected={item.isSelected ?? false}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return {FilterBar, chipData};
};

export default useFilter;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: theme.spacing.s,
      padding: theme.spacing.s,
    },
  });
