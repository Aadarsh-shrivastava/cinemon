import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {Suspense, useState} from 'react';
import {Theme, useTheme} from '../../contexts/themeContext';
import SearchBar from './components/SearchBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import useFilter from '../../hooks/useFilter';
import {chip} from 'types';
import VerticalMovieCard from 'components/VerticalMovieCard';
import {StackScreenProps} from '@react-navigation/stack';
import {BrowserStackParamList} from 'navigation/BrowserStack';
import useApi from '../../hooks/useApi';
import Logger from 'components/Logger';
import useInfiniteApi from '../../hooks/useInfiniteApi';
import FilterBar from 'components/FilterBar';
import Icon from '../../Icon';

type BrowserScreenProps = StackScreenProps<BrowserStackParamList, 'MovieStack'>;
const TaskScreen = ({navigation}: BrowserScreenProps) => {
  const {theme, toggleTheme} = useTheme();
  const [sortBy, setSortBy] = useState<string>('popularity');
  const {width, height} = useWindowDimensions();

  const {
    data: filters,
    isLoading: isLoadingFilters,
  }: {data: {genres: chip[]}; isLoading: boolean} = useApi(
    '/3/genre/movie/list',
    'GET',
    'filters',
  );

  const {FilterBar: FilterBarComponent, chipData} = useFilter(
    filters ? filters.genres : [],
  );

  const {data, fetchNextPage} = useInfiniteApi(
    '3/discover/movie' +
      (chipData && chipData.length > 0 && chipData.some(item => item.isSelected)
        ? '?with_genres=28,' +
          chipData
            .filter(item => item.isSelected)
            .map(item => item.id)
            .join(',') +
          (sortBy != 'None' ? `&sort_by=${sortBy}.desc` : '')
        : sortBy != 'None'
        ? `?sort_by=${sortBy}.desc`
        : ''),
    'GET',
    'popular_movies',
  );

  return (
    <SafeAreaView style={styles(theme).container}>
      <Text style={{color: 'red'}}>{sortBy}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Pressable
          onPress={() => navigation.push('SearchScreen')}
          style={{flexGrow: 1}}>
          <SearchBar isReadOnly />
        </Pressable>
        <Icon
          name={'filter-list'}
          type={'MaterialIcons'}
          onPress={() =>
            navigation.navigate('FilterScreen', {
              checked: sortBy,
              setChecked: setSortBy,
            })
          }
        />
      </View>
      {!isLoadingFilters && <FilterBarComponent />}
      <FlatList
        numColumns={2}
        data={data ? data.pages.flatMap(page => page.results) : []}
        renderItem={({item, index}) => (
          <View style={{gap: theme.spacing.s}}>
            <VerticalMovieCard
              width={12}
              height={16}
              item={item}
              onPress={(id: number) =>
                navigation.push('MovieStack', {tmdbId: id})
              }
            />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        columnWrapperStyle={{gap: theme.spacing.s}}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={2}
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
    container: {
      padding: theme.spacing.s,
      backgroundColor: theme.colors.background,
    },
  });
