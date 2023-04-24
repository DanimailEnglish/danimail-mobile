import auth from '@react-native-firebase/auth';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';

import {CurrentUserContext} from './CurrentUserContext';
import type {CurrentUserContextValue} from './types';

export interface CurrentUserProviderProps {
  children?: React.ReactNode;
}

export function CurrentUserProvider({
  children,
}: CurrentUserProviderProps): JSX.Element {
  const [initializing, setInitializing] = useState(true);
  const [currentUser, setCurrentUser] = useState<CurrentUserContextValue>(null);

  useEffect(() => {
    function onAuthStateChanged(user: CurrentUserContextValue) {
      setCurrentUser(user);
      if (initializing) setInitializing(false);
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [initializing]);

  if (initializing) {
    return <ActivityIndicator />;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
}
