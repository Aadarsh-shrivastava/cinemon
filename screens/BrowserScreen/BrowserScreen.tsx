import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from '../../contexts/themeContext';
import SearchBar from './components/SearchBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import useFilter from '../../hooks/useFilter';
import {chip} from 'types';
import VerticalMovieCard from 'components/VerticalMovieCard';
import {StackScreenProps} from '@react-navigation/stack';
import {BrowserStackParamList} from 'navigation/BrowserStack';

type BrowserScreenProps = StackScreenProps<BrowserStackParamList, 'MovieStack'>;
const TaskScreen = ({navigation}: BrowserScreenProps) => {
  const {theme, toggleTheme} = useTheme();
  const filterData: chip[] = [
    {label: 'All Shows', isSelected: false},
    {label: 'Movies', isSelected: false},
    {label: 'TV Shows', isSelected: false},
    {label: 'Streaming', isSelected: false},
  ];

  const {FilterBar, chipData} = useFilter(filterData);
  return (
    <SafeAreaView style={styles(theme).container}>
      <SearchBar />
      <FilterBar />
      <FlatList
        numColumns={2}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => navigation.push('MovieStack')}
            style={{marginHorizontal: theme.spacing.s}}>
            <VerticalMovieCard width={12} height={16} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.toString()}
        contentContainerStyle={{
          gap: theme.spacing.s,
          margin: 'auto',
        }}
      />
    </SafeAreaView>
  );
};

export default TaskScreen;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {margin: theme.spacing.s},
  });
