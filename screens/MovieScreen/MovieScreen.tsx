import {
  FlatList,
  ScrollView,
  SectionList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Theme, useTheme} from 'contexts/themeContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import Banner from 'components/Banner';
import Button from 'components/Button';
import ThumbNail from 'components/ThumbNail';
import SectionHeader from 'components/SectionHeader';
import RatingCard from 'components/RatingCard';
import VerticalMovieCard from 'components/VerticalMovieCard';
import Icon from '../../Icon';
import {StackScreenProps} from '@react-navigation/stack';
import {MovieStackParamList} from 'navigation/MovieStackNavigator';
import Carousal from 'components/Carousal';
import useButtonBar, {button} from '../../hooks/useButtonBar';

type MovieScreenProps = StackScreenProps<MovieStackParamList, 'MovieScreen'>;
const MovieScreen = ({navigation}: MovieScreenProps) => {
  const {theme, toggleTheme} = useTheme();

  const firstButtons: button[] = [
    {
      label: 'Rating',
      onPress: () => navigation.push('RatingScreen'),
    },
    {
      label: 'Guide',
      onPress: () => navigation.push('GuideScreen'),
    },
    {
      label: 'Awards',
      onPress: () => navigation.push('AwardScreen'),
    },
    {
      label: 'Cast',
      onPress: () => navigation.push('CastScreen'),
    },
  ];

  const secondButtons: button[] = [
    {
      label: 'Wishlist',
      leftIcon: <Icon name="add" type="MaterialIcons" size={20} />,
    },
    {
      label: 'Set Reminder',

      leftIcon: <Icon name="alarm" type="MaterialIcons" size={20} />,
    },
  ];

  const {ButtonBar: FirstButtonBar} = useButtonBar({
    buttons: firstButtons,
    buttonsStyle: {backgroundColor: theme.colors.inactive, borderRadius: 10},
    paddingHorizontal: 5,
    containerStyle: {margin: 10},
  });

  const {ButtonBar: SecondButtonBar} = useButtonBar({
    buttons: secondButtons,
    paddingHorizontal: 4,
    buttonsStyle: {
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
    },
    containerStyle: {margin: 5},
  });

  const section = [
    {
      title: '',
      data: [[1, 2, 3, 4, 5]],
      component: ThumbNail,
    },
    {
      title: 'Ratings & Reviews',
      data: [[4, 5, 6, 7, 8]],
      component: RatingCard,
    },
    {
      title: 'You might also like',
      data: [[4, 5, 6, 7]],
      component: VerticalMovieCard,
      onPress: () => navigation.push('MovieScreen'),
    },
  ];
  return (
    <View style={styles(theme).container}>
      <StatusBar barStyle={'light-content'} />

      <SectionList
        sections={section}
        renderSectionHeader={({section}) =>
          section.title ? (
            <SectionHeader
              sectionTitle={section.title}
              actionTitle={''}
              onPress={() => {}}
            />
          ) : null
        }
        ListHeaderComponent={() => (
          <View>
            <Banner height={13} />

            <FirstButtonBar />
            <SecondButtonBar />
          </View>
        )}
        renderItem={({item, section}) => (
          <Carousal
            onPress={section.onPress ? section.onPress : () => {}}
            data={item}
            renderChild={dataitem => <section.component />}
          />
        )}
      />
    </View>
  );
};

export default MovieScreen;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {margin: 'auto'},
    buttons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      margin: 'auto',
      gap: 5,
      marginVertical: theme.spacing.m,
    },
  });

const Buttons = ({theme, navigation, width, width2}: any) => {
  return (
    <>
      <View style={styles(theme).buttons}>
        <Button
          color={theme.colors.inactive}
          title={'Rating'}
          width={width}
          onPress={() => navigation.navigate('RatingScreen')}
        />
        <Button
          color={theme.colors.inactive}
          title={'Guide'}
          width={width}
          onPress={() => {}}
        />
        <Button
          color={theme.colors.inactive}
          title={'Awards'}
          width={width}
          onPress={() => {}}
        />
        <Button
          color={theme.colors.inactive}
          title={'Cast'}
          width={width}
          onPress={() => {}}
        />
      </View>
      <View style={styles(theme).buttons}>
        <Button
          onPress={() => {}}
          title={'Wishlist'}
          width={width2}
          leftIcon={() => (
            <Icon name={'add'} type={'MaterialIcons'} size={24} />
          )}
        />
        <Button
          onPress={() => {}}
          title={'Set Reminder'}
          width={width2}
          leftIcon={() => (
            <Icon name={'alarm'} type={'MaterialIcons'} size={24} />
          )}
        />
      </View>
    </>
  );
};
