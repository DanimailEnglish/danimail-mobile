import type {FirebaseAuthTypes} from '@react-native-firebase/auth';

import {
  FirestoreUserData,
  FirestoreUserReadOnlyData,
} from '../../lib/firestore';

export interface MergedFirebaseUserData
  extends FirestoreUserData,
    FirestoreUserReadOnlyData {}

export interface CurrentUserContextValue {
  authUser: FirebaseAuthTypes.User | null;
  firestoreUser: MergedFirebaseUserData | null;
}
