import type { AuthError } from "firebase/auth";

export type FirebaseAuthError = AuthError;

export interface SignUpWithEmailOpts {
  email: string;
  password: string;
}
