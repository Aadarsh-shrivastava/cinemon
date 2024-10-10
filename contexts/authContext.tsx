import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FC,
  useContext,
} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  initializing: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: FC<{children: ReactNode}> = ({children}) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [initializing]);

  return (
    <AuthContext.Provider value={{user, initializing}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const Context = useContext(AuthContext);
  if (Context == undefined) {
    throw new Error('Wrap your component with Auth Provider');
  }
  return AuthContext;
};

export default useAuth;
