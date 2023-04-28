import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import type {FirestoreUserData, FirestoreUserReadOnlyData} from './types';

function userDocument(userId: string) {
  return firestore().doc<FirestoreUserData>(`users/${userId}`);
}

function userReadOnlyDocument(userId: string) {
  return firestore().doc<FirestoreUserReadOnlyData>(
    `users/${userId}/protected/readOnly`,
  );
}

function get(userId: string) {
  return userDocument(userId).get();
}

function getReadOnly(userId: string) {
  return userReadOnlyDocument(userId).get();
}

function getSnapshot(
  userId: string,
  onNext: (
    snapshot: FirebaseFirestoreTypes.DocumentSnapshot<FirestoreUserData>,
  ) => void,
  onError?: (error: Error) => void,
): () => void {
  return userDocument(userId).onSnapshot(onNext, onError);
}

function getReadOnlySnapshot(
  userId: string,
  onNext: (
    snapshot: FirebaseFirestoreTypes.DocumentSnapshot<FirestoreUserReadOnlyData>,
  ) => void,
  onError?: (error: Error) => void,
): () => void {
  return userReadOnlyDocument(userId).onSnapshot(onNext, onError);
}

function create(userId: string, data: FirestoreUserData) {
  userDocument(userId).set(data);
}

function update(userId: string, data: Partial<FirestoreUserData>) {
  userDocument(userId).update(data);
}

export const Users = {
  get,
  getReadOnly,
  getSnapshot,
  getReadOnlySnapshot,
  create,
  update,
};
