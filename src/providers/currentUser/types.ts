import type {FirebaseAuthTypes} from '@react-native-firebase/auth';

import {FirestoreUser} from '../../lib/firestore';

export interface CurrentUserContextValue {
  authUser: FirebaseAuthTypes.User | null;
  firestoreUser: FirestoreUser | null;
}
