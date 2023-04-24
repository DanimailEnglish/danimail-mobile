import type {FirebaseAuthTypes} from '@react-native-firebase/auth';

export type FirebaseAuthError = FirebaseAuthTypes.NativeFirebaseAuthError;

export interface SignUpWithEmailOpts {
  email: string;
  password: string;
  onSuccess?: () => void | Promise<void>;
  onError?: (error: NodeJS.ErrnoException) => void | Promise<void>;
}
