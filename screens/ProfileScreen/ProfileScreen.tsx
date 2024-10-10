import {Alert, Image, Linking, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {Theme, useTheme} from '../../contexts/themeContext';
import Carousal from 'components/Carousal';
import VerticalMovieCard from 'components/VerticalMovieCard';
import {watchlist} from 'data';
import SectionHeader from 'components/SectionHeader';
import {useDispatch, useSelector} from 'react-redux';
import Logger from 'components/Logger';
import {addToWatchList} from 'redux/watchlistAction';
import {movie_detail} from 'types';
import Button from 'components/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth, {AuthContext} from 'contexts/authContext';
import auth from '@react-native-firebase/auth';

const url = 'https://api.themoviedb.org/3/authentication/token/new';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YmVjNmRjMmQ4OWZkYTU2ZGVmMmFlNWIyOGVhZDExOCIsIm5iZiI6MTcyNzg5OTQxNy4wOTQ5MTMsInN1YiI6IjY2ZTdlMTk2ZGQyMjRkMWEzOTkxYmZjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Jyme0XEPuZRzzBrUpiTdgj1QhwoN7OPYDbp0PuBDhqI',
  },
};
const TaskScreen = () => {
  const {theme, toggleTheme} = useTheme();
  const movies: movie_detail = useSelector((state: any) => state.watchlist);
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const {user} = authContext;

  const signOut = () => {
    auth().signOut();
  };
  const handleSignIn = async () => {
    auth()
      .signInAnonymously()
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  };

  return (
    <View style={styles(theme).container}>
      {user && <Logger item={user} />}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: theme.spacing.ml,
        }}>
        <Image
          style={styles(theme).profile}
          source={{
            uri: `https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`,
          }}
          height={100}
          width={100}
        />
        <View
          style={{alignItems: 'flex-start', justifyContent: 'space-between'}}>
          <Text>Aadarsh Shrivastava</Text>
          <Text>Aadarshkhurai@gmail.com</Text>
          <Button
            title={'Edit Profile'}
            onPress={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </View>
      </View>
      <SectionHeader
        sectionTitle={'WatchList'}
        actionTitle={''}
        onPress={() => {}}
      />
      <Carousal
        renderChild={item => <VerticalMovieCard item={item} />}
        data={movies}
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="Sign Out" onPress={handleSignIn} />
    </View>
  );
};

export default TaskScreen;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {margin: theme.spacing.s},
    profile: {margin: theme.spacing.m, borderRadius: theme.spacing.m},
  });
