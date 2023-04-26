import type {FirebaseAuthTypes} from '@react-native-firebase/auth';

import {FirestoreUserData} from '../../lib/firestore';

export interface CurrentUserContextValue {
  authUser: FirebaseAuthTypes.User | null;
  firestoreUser: FirestoreUserData | null;
}
