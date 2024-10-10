import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
import {StackScreenProps} from '@react-navigation/stack';
import {MovieStackParamList} from 'navigation/MovieStackNavigator';
import useApi from 'hooks/useApi';
import Logger from 'components/Logger';
import {Cast, Credits} from 'types';
import CastCard from 'components/CastCard';

type CastScreenProps = StackScreenProps<MovieStackParamList, 'CastScreen'>;
const CastScreen = ({route}: CastScreenProps) => {
  const {theme, toggleTheme} = useTheme();
  const {tmdbId} = route.params;

  const {data, isLoading}: {data: Credits; isLoading: boolean} = useApi(
    `/3/movie/${tmdbId}/credits`,
    'GET',
    'Cast',
  );
  const cast: Cast[] = data?.cast;
  return (
    <View style={styles(theme).container}>
      <FlatList
        columnWrapperStyle={{gap: 10}}
        contentContainerStyle={{gap: 10}}
        style={{margin: 'auto'}}
        numColumns={4}
        data={cast}
        renderItem={({item, index}) => <CastCard item={item} />}
        keyExtractor={item => item.cast_id.toString()}
        showsVerticalScrollIndicator={false}
      />
      {/* <Logger item={data} /> */}
    </View>
  );
};

export default CastScreen;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {},
  });
