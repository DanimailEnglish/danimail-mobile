import { httpsCallable } from "firebase/functions";

import { functions } from "../../../firebaseConfig";
import type { FirestoreUser } from "../firestore";

export type UpdateCurrentUserParams = Pick<
  FirestoreUser,
  "firstName" | "lastName" | "nickname" | "phoneNumber" | "email"
>;

export const updateCurrentUser = httpsCallable<UpdateCurrentUserParams, void>(
  functions,
  "updateCurrentUser",
);
