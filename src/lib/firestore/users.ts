import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import type {FirestoreUserData} from './types';

function collection() {
  return firestore().collection<FirestoreUserData>('users');
}

function get(userId: string) {
  return collection().doc(userId).get();
}

function getSnapshot(
  userId: string,
  onNext: (
    snapshot: FirebaseFirestoreTypes.DocumentSnapshot<FirestoreUserData>,
  ) => void,
  onError?: (error: Error) => void,
): () => void {
  return collection().doc(userId).onSnapshot(onNext, onError);
}

function create(userId: string, data: FirestoreUserData) {
  collection().doc(userId).set(data);
}

function update(userId: string, data: Partial<FirestoreUserData>) {
  collection().doc(userId).update(data);
}

export const Users = {
  get,
  getSnapshot,
  create,
  update,
};
