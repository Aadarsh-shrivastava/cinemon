import {Theme, useTheme} from 'contexts/themeContext';
import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import Carousal from 'components/Carousal';
import VerticalMovieCard from 'components/VerticalMovieCard';
import SectionHeader from 'components/SectionHeader';
import Logger from 'components/Logger';
import Button from 'components/Button';
import useAuth from 'contexts/authContext';
import {movie_detail} from 'types';
import {useSelector} from 'react-redux';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import LoginForm from './LoginForm';
import SignUpForm from './SignUp';

// Define the validation schema using Zod
const schema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address')
    .nonempty('Email is required'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .nonempty('Password is required'),
});

type FormInputs = z.infer<typeof schema>;

interface AuthScreenProps {}
const AuthScreen = ({}: AuthScreenProps) => {
  const {theme, toggleTheme} = useTheme();
  const [isAlreadyAUser, setIsAlreadyAUser] = useState<boolean>(true);
  const movies: movie_detail = useSelector((state: any) => state.watchlist);
  const {user, signInWithEmailANdPassWord, googleSignIn, signUp} = useAuth();
  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).buttons}>
        {isAlreadyAUser ? <LoginForm /> : <SignUpForm />}
        {isAlreadyAUser ? (
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'black'}}>Don't have an account ? </Text>
            <Text
              style={{color: 'blue'}}
              onPress={() => setIsAlreadyAUser(!isAlreadyAUser)}>
              Sign Up
            </Text>
          </View>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'black'}}>Already a user ? </Text>
            <Text
              style={{color: 'blue'}}
              onPress={() => setIsAlreadyAUser(!isAlreadyAUser)}>
              Login
            </Text>
          </View>
        )}
        <Button
          title="Google"
          width={'90%'}
          color="transparent"
          onPress={googleSignIn}
          barStyle={{borderWidth: 1, borderColor: 'black', borderRadius: 15}}
        />
        {/* <Button title="Facebook" width={'90%'} color="#4275bd" />
        <Button title="Twitter" width={'90%'} color="#52aeff" /> */}
        {/* <Button
          title="Anonymous Sign In"
          onPress={signInAnonymous}
          width={'90%'}
        /> */}
      </View>
    </View>
  );
};

export default AuthScreen;

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {margin: theme.spacing.s},
    profile: {margin: theme.spacing.m, borderRadius: theme.spacing.m},
    buttons: {
      alignItems: 'center',
      gap: theme.spacing.ml,
    },
  });
