import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator} from 'react-native';

import {Spacer} from '../../components';
import {Firestore} from '../../lib/firestore';
import {CurrentUserContext} from './CurrentUserContext';
import {CurrentUserContextValue} from './types';

export interface CurrentUserProviderProps {
  children?: React.ReactNode;
}

export function CurrentUserProvider({
  children,
}: CurrentUserProviderProps): JSX.Element {
  const [authUser, setAuthUser] =
    useState<CurrentUserContextValue['authUser']>();
  const [firestoreUser, setFirestoreUser] =
    useState<CurrentUserContextValue['firestoreUser']>();

  // Listen for auth changes
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(
      (user: FirebaseAuthTypes.User | null) => {
        setAuthUser(user);
        if (user == null) setFirestoreUser(null);
      },
    );

    return subscriber;
  }, []);

  // Listen for firestore user changes
  useEffect(() => {
    const userId = authUser?.uid;
    if (userId != null) {
      const subscriber = Firestore.getUser(userId, snapshot => {
        setFirestoreUser(snapshot.data() ?? null);
      });

      return subscriber;
    }
    return undefined;
  }, [authUser?.uid]);

  const contextValue: CurrentUserContextValue | undefined = useMemo(() => {
    if (authUser === undefined || firestoreUser === undefined) {
      return undefined;
    }
    return {
      authUser,
      firestoreUser,
    };
  }, [authUser, firestoreUser]);

  if (contextValue == null) {
    return (
      <Spacer flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Spacer>
    );
  }

  return (
    <CurrentUserContext.Provider value={contextValue}>
      {children}
    </CurrentUserContext.Provider>
  );
}
