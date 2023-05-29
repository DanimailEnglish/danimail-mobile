import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator } from "react-native";

import { auth } from "../../../firebaseConfig";
import { Spacer } from "../../components";
import { Firestore } from "../../lib/firestore";
import { CurrentUserContext } from "./CurrentUserContext";
import { CurrentUserContextValue } from "./types";

export interface CurrentUserProviderProps {
  children?: React.ReactNode;
}

export function CurrentUserProvider({
  children,
}: CurrentUserProviderProps): JSX.Element {
  const [authUser, setAuthUser] =
    useState<CurrentUserContextValue["authUser"]>();
  const [firestoreUser, setFirestoreUser] =
    useState<CurrentUserContextValue["firestoreUser"]>();

  // Listen for auth changes
  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user: User | null) => {
      setAuthUser(user);
      if (user == null) setFirestoreUser(null);
    });

    return subscriber;
  }, []);

  // Listen for firestore user changes
  useEffect(() => {
    const userId = authUser?.uid;
    if (userId != null) {
      const subscriber = Firestore.onUserSnapshot(userId, (snapshot) => {
        setFirestoreUser(snapshot.data() ?? null);
      });

      return subscriber;
    }
    return undefined;
  }, [authUser?.uid]);

  const currentUser: CurrentUserContextValue | undefined = useMemo(() => {
    // Initialization hasn't finished
    if (authUser === undefined || firestoreUser === undefined) {
      return undefined;
    }

    // Initialization has finished
    return {
      authUser,
      firestoreUser,
    };
  }, [authUser, firestoreUser]);

  // Display screen-wide spinner until initialization is finished.
  if (currentUser == null) {
    return (
      <Spacer flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Spacer>
    );
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
}
