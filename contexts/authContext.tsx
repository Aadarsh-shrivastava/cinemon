import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FC,
  useContext,
} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {getAuth, signOut} from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '239073733004-uvl6vhq5bg58h07ihkt8tjb24fs98g9c.apps.googleusercontent.com', // From Firebase Console
});

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  initializing: boolean;
  signInAnonymous: () => Promise<void>;
  signInWithEmailANdPassWord: (
    email: string,
    password: string,
  ) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  googleSignIn: () => any;
  signOut: any;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: FC<{children: ReactNode}> = ({children}) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log('got new user', user);
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [initializing]);

  // Method to sign in using email and password
  const signInWithEmailANdPassWord = async (
    email: string,
    password: string,
  ): Promise<void> => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error; // Re-throw the error so the caller can handle it
    }
  };

  // Method to sign up using email and password
  const signUp = async (
    email: string,
    password: string,
    name: string,
  ): Promise<void> => {
    try {
      console.log('singinup', email, password, name);
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const {user} = userCredential;
      console.log('singinup', user);
      await user.updateProfile({
        displayName: name,
      });

      console.log('User signed up and profile updated');
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };
  const signInAnonymous = async (): Promise<void> => {
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
  const signOut = async (): Promise<void> => {
    console.log('singing out');
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  const googleSignIn = async (): Promise<void> => {
    await GoogleSignin.signOut();
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {data} = await GoogleSignin.signIn();

    const id = data?.idToken;
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(id ?? null);
    console.log('Signed in');
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        initializing,
        signInWithEmailANdPassWord,
        signOut,
        signUp,
        signInAnonymous,
        googleSignIn,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const Context = useContext(AuthContext);
  if (Context == undefined) {
    throw new Error('Wrap your component with Auth Provider');
  }
  return Context;
};

export default useAuth;
