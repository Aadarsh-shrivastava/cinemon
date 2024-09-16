import {SectionList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Theme, useTheme} from '../../contexts/themeContext';
import Carousal from 'components/Carousal';
import SectionHeader from 'components/SectionHeader';
import {chip} from 'types';
import useFilter from '../../hooks/useFilter';
import VerticalMovieCard from 'components/VerticalMovieCard';

const TaskScreen = () => {
  const {theme, toggleTheme} = useTheme();

  const FilterChipsData: chip[] = [
    {label: 'Videos', isSelected: false},
    {label: 'TV Shows', isSelected: false},
    {label: 'Streaming', isSelected: false},
    {label: 'News', isSelected: false},
  ];

  const sections = [
    {title: 'Top 10 Movies for you', data: [[1, 2, 3, 4]]},
    {title: 'Upcoming movie', data: [[1, 2, 3, 4]]},
  ];

  const {FilterBar, chipData} = useFilter(FilterChipsData);
  return (
    <View style={styles(theme).container}>
      <FilterBar />
      {/* <Text style={{color: 'black'}}>{JSON.stringify(chipData)}</Text> */}
      <SectionList
        sections={sections}
        renderItem={({item, section}) => (
          <Carousal
            data={item}
            renderChild={dataitem => <VerticalMovieCard />}
          />
        )}
        showsHorizontalScrollIndicator={false}
        renderSectionHeader={({section}) => (
          <SectionHeader
            sectionTitle={section.title}
            actionTitle={'See More'}
            onPress={() => {}}
          />
        )}
        keyExtractor={(item, index) => item.toString()}
        contentContainerStyle={{paddingBottom: theme.spacing.xl * 2}}
      />
    </View>
  );
};

export default TaskScreen;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {margin: theme.spacing.s},
  });
