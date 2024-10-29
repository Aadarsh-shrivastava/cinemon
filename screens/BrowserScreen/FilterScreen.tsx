import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
import {PaperProvider, RadioButton} from 'react-native-paper';
import {StackScreenProps} from '@react-navigation/stack';
import {MovieStackParamList} from 'navigation/MovieStackNavigator';
import {BrowserStackParamList} from 'navigation/BrowserStack';

type FilterScreenProps = StackScreenProps<
  BrowserStackParamList,
  'FilterScreen'
>;
const FilterScreen = ({route}: FilterScreenProps) => {
  const {theme, toggleTheme} = useTheme();
  const {checked, setChecked} = route.params;
  const [locakSortyBy, setLoackSortBy] = useState(checked);
  return (
    <PaperProvider>
      <View style={styles(theme).container}>
        <Text style={styles(theme).label}>Sort By</Text>

        <View style={styles(theme).button_label}>
          <RadioButton
            value="popularity"
            color={theme.colors.foreground}
            status={locakSortyBy === 'popularity' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked('popularity');
              setLoackSortBy('popularity');
            }}
          />
          <Text style={styles(theme).label}>Popularity</Text>
        </View>

        <View style={styles(theme).button_label}>
          <RadioButton
            value="revenue"
            color={theme.colors.foreground}
            status={locakSortyBy === 'revenue' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked('revenue');
              setLoackSortBy('revenue');
            }}
          />
          <Text style={styles(theme).label}>revenue</Text>
        </View>

        <View style={styles(theme).button_label}>
          <RadioButton
            value="rating"
            color={theme.colors.foreground}
            status={locakSortyBy === 'rating' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked('rating');
              setLoackSortBy('rating');
            }}
          />
          <Text style={styles(theme).label}>rating</Text>
        </View>

        <View style={styles(theme).button_label}>
          <RadioButton
            value="None"
            color={theme.colors.foreground}
            status={locakSortyBy === 'None' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked('None');
              setLoackSortBy('None');
            }}
          />
          <Text style={styles(theme).label}>None</Text>
        </View>

        <Text>Country</Text>
      </View>
    </PaperProvider>
  );
};

export default FilterScreen;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {backgroundColor: theme.colors.background},
    radioButton: {color: theme.colors.foreground},
    label: {color: theme.colors.foreground, margin: theme.spacing.s},
    button_label: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: theme.spacing.s,
    },
  });
