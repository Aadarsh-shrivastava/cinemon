import {
  ScrollView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Theme, useTheme} from '../../contexts/themeContext';
import Banner from '../../components/Banner';
import Carousal from 'components/Carousal';
import VerticalMovieCard from 'components/VerticalMovieCard';
import SectionHeader from 'components/SectionHeader';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList} from 'navigation/HomeStack';
import {useNavigation} from '@react-navigation/native';

type HomeScreenNavigationProps = StackNavigationProp<
  HomeStackParamList,
  'HomeScreen'
>;
const HomeScreen = () => {
  const {theme, toggleTheme} = useTheme();
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const sections = [
    {title: 'Top 10 Movies for you', data: [[1, 2, 3, 4]]},
    {title: 'Upcoming movie', data: [[1, 2, 3, 4]]},
  ];
  return (
    <View style={styles(theme).container}>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor="transparent"
      />
      <SectionList
        ListHeaderComponent={() => (
          <View>
            <Banner />
          </View>
        )}
        sections={sections}
        renderItem={({item, section}) => (
          <Carousal
            data={item}
            renderChild={dataitem => (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('MovieStack');
                }}>
                <VerticalMovieCard />
              </TouchableOpacity>
            )}
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

export default HomeScreen;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {},
  });
