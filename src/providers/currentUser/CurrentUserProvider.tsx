import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator} from 'react-native';

import {Firestore} from '../../lib/firestore';
import {CurrentUserContext} from './CurrentUserContext';
import type {CurrentUserContextValue} from './types';

export interface CurrentUserProviderProps {
  children?: React.ReactNode;
}

export function CurrentUserProvider({
  children,
}: CurrentUserProviderProps): JSX.Element {
  const [initializing, setInitializing] = useState(true);
  const [authUser, setAuthUser] =
    useState<CurrentUserContextValue['authUser']>(null);
  const [firestoreUser, setFirestoreUser] =
    useState<CurrentUserContextValue['firestoreUser']>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(
      (user: FirebaseAuthTypes.User | null) => {
        setAuthUser(user);
        if (initializing) setInitializing(false);
      },
    );

    return subscriber;
  }, [initializing]);

  useEffect(() => {
    const userId = authUser?.uid;
    if (userId != null) {
      const subscriber = Firestore.Users.getSnapshot(userId, userSnapshot => {
        setFirestoreUser(userSnapshot.data() ?? null);
      });
      return subscriber;
    }
    setFirestoreUser(null);
    return undefined;
  }, [authUser?.uid]);

  const contextValue = useMemo(
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
