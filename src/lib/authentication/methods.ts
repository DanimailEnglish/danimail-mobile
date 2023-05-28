import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../../../firebaseConfig";
import { SignUpWithEmailOpts } from "./types";

export async function signUpWithEmail({
  email,
  password,
}: SignUpWithEmailOpts): Promise<void> {
  await createUserWithEmailAndPassword(auth, email, password);
  // Send verification email
}

export async function logInWithEmail({
  email,
  password,
}: SignUpWithEmailOpts): Promise<void> {
  if (email.length === 0 || password.length === 0) {
    return;
  }
  await signInWithEmailAndPassword(auth, email, password);
}

export function logOut() {
  signOut(auth);
}
