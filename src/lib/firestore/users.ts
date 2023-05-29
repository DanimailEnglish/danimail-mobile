import {
  collection,
  doc,
  DocumentSnapshot,
  FirestoreDataConverter,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../../../firebaseConfig";
import { FirestoreUser } from "./types";

const userConverter: FirestoreDataConverter<FirestoreUser> = {
  toFirestore: (user) => user,
  fromFirestore: (userDoc) => userDoc.data() as FirestoreUser,
};

function usersCollection() {
  return collection(db, "users").withConverter(userConverter);
}

function usersDoc(userId: string) {
  return doc(usersCollection(), userId);
}

export function onUserSnapshot(
  userId: string,
  onNext: (snapshot: DocumentSnapshot<FirestoreUser>) => void,
  onError?: (error: Error) => void,
): () => void {
  return onSnapshot(usersDoc(userId), onNext, onError);
}
