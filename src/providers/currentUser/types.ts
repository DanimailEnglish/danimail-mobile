import { User } from "firebase/auth";

import { FirestoreUser } from "../../lib/firestore";

export interface CurrentUserContextValue {
  authUser: User | null;
  firestoreUser: FirestoreUser | null;
}
