import {Alert, Image, Linking, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Theme, useTheme} from '../../contexts/themeContext';
import Carousal from 'components/Carousal';
import VerticalMovieCard from 'components/VerticalMovieCard';
import SectionHeader from 'components/SectionHeader';
import {useDispatch, useSelector} from 'react-redux';
import {movie_detail} from 'types';
import Button from 'components/Button';
import useAuth, {AuthContext} from 'contexts/authContext';
import {getWatchList} from '../../firebase/firestore/watchList';
import firestore from '@react-native-firebase/firestore';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProfileStackParamList} from 'navigation/ProfileStack';
import {useNavigation} from '@react-navigation/native';
import VerticalMovieCardLoader from 'components/Loaders/VerticalMovieCardLoader';

type ProfileScreenNavigationProps = StackNavigationProp<
  ProfileStackParamList,
  'ProfileScreen'
>;
const TaskScreen = () => {
  const {theme, toggleTheme} = useTheme();
  const [watchList, setWatchList] = useState<movie_detail[]>([]);
  const navigation = useNavigation<ProfileScreenNavigationProps>();

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const {user, signOut} = authContext;

  getWatchList(user?.uid ?? '')
    .then(d => setWatchList(d))
    .catch(e => console.log(e));

  return (
    <View style={styles(theme).container}>
      {/* {user && <Logger item={user} />} */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: theme.spacing.ml,
        }}>
        <Image
          style={styles(theme).profile}
          source={{
            uri:
              user?.photoURL ??
              `https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`,
          }}
          height={100}
          width={100}
        />
        <View
          style={{alignItems: 'flex-start', justifyContent: 'space-between'}}>
          <Text style={styles(theme).text}>{user?.displayName}</Text>
          <Text style={styles(theme).text}>{user?.email}</Text>
          {/* <Button
            title={'Edit Profile'}
            onPress={function (): void {
              throw new Error('Function not implemented.');
            }}
          /> */}
        </View>
      </View>
      <SectionHeader
        sectionTitle={'WatchList'}
        actionTitle={''}
        onPress={() => {}}
      />
      <Carousal
        renderChild={(item: movie_detail) => (
          <VerticalMovieCard
            item={item}
            onPress={(id: number) =>
              navigation.push('MovieStack', {tmdbId: id})
            }
          />
        )}
        data={watchList}
      />
      <View style={styles(theme).buttons}>
        <Button title="Sign Out" onPress={signOut} width={'90%'} />
      </View>
      {/* <VerticalMovieCardLoader /> */}
    </View>
  );
};

export default TaskScreen;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {margin: theme.spacing.s},
    profile: {margin: theme.spacing.m, borderRadius: theme.spacing.m},
    buttons: {
      alignItems: 'center',
      gap: theme.spacing.ml,
    },
    text: {color: theme.colors.foreground},
  });
