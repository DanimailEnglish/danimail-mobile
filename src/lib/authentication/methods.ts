import auth from '@react-native-firebase/auth';

import type {FirebaseAuthError, SignUpWithEmailOpts} from './types';

export function isFirebaseAuthError(
  error: unknown,
): error is FirebaseAuthError {
  const {userInfo} = error as FirebaseAuthError;
  return (
    typeof userInfo === 'object' &&
    (userInfo.authCredential === null ||
      typeof userInfo.authCredential === 'object') &&
    (userInfo.resolver === null || typeof userInfo.resolver === 'object')
  );
}

export function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  if (typeof error !== 'object') {
    return false;
  }

  const {errno, code, path, syscall} = error as NodeJS.ErrnoException;
  return (
    (errno === undefined || typeof errno === 'number') &&
    (code === undefined || typeof code === 'string') &&
    (path === undefined || typeof path === 'string') &&
    (syscall === undefined || typeof syscall === 'string')
  );
}

export async function logInWithEmail({
  email,
  password,
  onSuccess,
  onError,
}: SignUpWithEmailOpts): Promise<void> {
  if (email.length === 0 || password.length === 0) {
    return;
  }
  try {
    await auth().signInWithEmailAndPassword(email, password);
    if (onSuccess != null) onSuccess();
  } catch (error) {
    if (isNodeError(error)) {
      if (onError != null) onError(error);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw error;
    }
  }
}

export async function signUpWithEmail({
  email,
  password,
  onSuccess,
  onError,
}: SignUpWithEmailOpts): Promise<void> {
  if (email.length === 0 || password.length === 0) {
    return;
  }
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    if (onSuccess != null) onSuccess();
  } catch (error) {
    if (isNodeError(error)) {
      if (onError != null) onError(error);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw error;
    }
  }
}

export async function logOut() {
  await auth().signOut();
}
