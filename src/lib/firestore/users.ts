import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import {FirestoreUser} from './types';

export function getUser(
  userId: string,
  onNext: (
    snapshot: FirebaseFirestoreTypes.DocumentSnapshot<FirestoreUser>,
  ) => void,
  onError?: (error: Error) => void,
): () => void {
  return firestore()
    .doc<FirestoreUser>(`users/${userId}`)
    .onSnapshot(onNext, onError);
}
