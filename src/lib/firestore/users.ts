import { doc, DocumentSnapshot, onSnapshot } from "firebase/firestore";

import { db } from "../../../firebaseConfig";
import { FirestoreUser } from "./types";

export function getUser(
  userId: string,
  onNext: (snapshot: DocumentSnapshot<FirestoreUser>) => void,
  onError?: (error: Error) => void,
): () => void {
  return onSnapshot(doc(db, "users", userId), onNext, onError);
}
