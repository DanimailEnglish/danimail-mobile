import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator} from 'react-native';

import {Firestore} from '../../lib/firestore';
import {CurrentUserContext} from './CurrentUserContext';
import {CurrentUserContextValue} from './types';

export interface CurrentUserProviderProps {
  children?: React.ReactNode;
}

export function CurrentUserProvider({
  children,
}: CurrentUserProviderProps): JSX.Element {
  const [initializing, setInitializing] = useState(true);
  const [authUser, setAuthUser] =
    useState<CurrentUserContextValue['authUser']>();
  const [firestoreUser, setFirestoreUser] =
    useState<CurrentUserContextValue['firestoreUser']>();

  // Listen for auth changes
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(
      (user: FirebaseAuthTypes.User | null) => {
        setAuthUser(user ?? undefined);
        if (initializing) setInitializing(false);
      },
    );

    return subscriber;
  }, [initializing]);

  // Listen for firestore user changes
  useEffect(() => {
    const userId = authUser?.uid;
    if (userId != null) {
      const subscriber = Firestore.getUser(userId, snapshot => {
        setFirestoreUser(snapshot.data());
      });

      return subscriber;
    }
    setFirestoreUser(undefined);
    return undefined;
  }, [authUser?.uid]);

  const contextValue: CurrentUserContextValue = useMemo(
    () => ({
      authUser,
      firestoreUser,
    }),
    [authUser, firestoreUser],
  );

  if (initializing) {
    return <ActivityIndicator />;
  }

  return (
    <CurrentUserContext.Provider value={contextValue}>
      {children}
    </CurrentUserContext.Provider>
  );
}
