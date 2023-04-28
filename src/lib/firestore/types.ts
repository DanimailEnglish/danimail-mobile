import type {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export interface FirestoreUserReadOnlyFields {
  createdAt: FirebaseFirestoreTypes.Timestamp;
  updatedAt: FirebaseFirestoreTypes.Timestamp;
  email?: string;
  role: 'STUDENT' | 'ADMIN';
  unusedVideos: number;
}

export interface FirestoreUserWritableFields {
  firstName?: string;
  lastName?: string;
}

export interface FirestoreUser
  extends FirestoreUserReadOnlyFields,
    FirestoreUserWritableFields {}
