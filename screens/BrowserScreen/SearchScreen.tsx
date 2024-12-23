import {FlatList, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
import SearchBar, {SearchBarHandle} from './components/SearchBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import useApi from 'hooks/useApi';
import Logger from 'components/Logger';
import VerticalMovieCard from 'components/VerticalMovieCard';
import {StackNavigationProp} from '@react-navigation/stack';
import {MovieStackParamList} from 'navigation/MovieStackNavigator';
import {useNavigation} from '@react-navigation/native';
import {BrowserStackParamList} from 'navigation/BrowserStack';

type VerticalMovieCardNavigarionProp =
  StackNavigationProp<BrowserStackParamList>;
interface SearchScreenProps {}
const SearchScreen = ({}: SearchScreenProps) => {
  const {theme, toggleTheme} = useTheme();
  const [query, setQuery] = useState<string>('');
  const searchBar = useRef<SearchBarHandle>(null);
  const navigation = useNavigation<VerticalMovieCardNavigarionProp>();
  const {data, isLoading} = useApi(
    `/3/search/movie?query=${query}`,
    'GET',
    'searched_movie',
  );

  useEffect(() => {
    searchBar.current?.focus();
  }, []);

  return (
    <SafeAreaView style={styles(theme).container}>
      <SearchBar
        ref={searchBar}
        value={query}
        onTextChange={q => {
          setQuery(q);
        }}
      />
      <FlatList
        numColumns={2}
        data={data ? data.results : []}
        renderItem={({item, index}) => (
          <View style={{gap: theme.spacing.s}}>
            <VerticalMovieCard
              width={12}
              height={16}
              item={item}
              onPress={(id: number) => {
                navigation.push('MovieStack', {tmdbId: id});
              }}
            />
          </View>
        )}
        keyExtractor={(item, index) => item.id.toString() + index.toString()}
        columnWrapperStyle={{gap: theme.spacing.s}}
        contentContainerStyle={{
          gap: theme.spacing.s,
          margin: 'auto',
        }}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      padding: theme.spacing.s,
      backgroundColor: theme.colors.background,
    },
  });
