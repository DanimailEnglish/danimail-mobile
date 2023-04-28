import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator} from 'react-native';

import {
  Firestore,
  FirestoreUserData,
  FirestoreUserReadOnlyData,
} from '../../lib/firestore';
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
    useState<CurrentUserContextValue['authUser']>(null);
  const [firestoreUser, setFirestoreUser] = useState<FirestoreUserData>();
  const [firestoreUserReadOnly, setFirestoreUserReadOnly] =
    useState<FirestoreUserReadOnlyData>();
  const [mergedFirestoreUser, setMergedFirestoreUser] =
    useState<CurrentUserContextValue['firestoreUser']>(null);

  // Listen for auth changes
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(
      (user: FirebaseAuthTypes.User | null) => {
        setAuthUser(user);
        if (initializing) setInitializing(false);
      },
    );

    return subscriber;
  }, [initializing]);

  // Listen for firestore user changes
  useEffect(() => {
    const userId = authUser?.uid;
    if (userId != null) {
      const userUnsubscribe = Firestore.Users.getSnapshot(userId, snapshot => {
        setFirestoreUser(snapshot.data());
      });
      const userReadOnlyUnsubscribe = Firestore.Users.getReadOnlySnapshot(
        userId,
        snapshot => {
          setFirestoreUserReadOnly(snapshot.data());
        },
      );

      return () => {
        userUnsubscribe();
        userReadOnlyUnsubscribe();
      };
    }
    setFirestoreUser(undefined);
    return undefined;
  }, [authUser?.uid]);

  // Merge user data when all data is available
  useEffect(() => {
    if (firestoreUser != null && firestoreUserReadOnly != null) {
      setMergedFirestoreUser({
        ...firestoreUser,
        ...firestoreUserReadOnly,
      });
    }
  }, [firestoreUser, firestoreUserReadOnly]);

  const contextValue = useMemo(
    () => ({
      authUser,
      firestoreUser: mergedFirestoreUser,
    }),
    [authUser, mergedFirestoreUser],
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
