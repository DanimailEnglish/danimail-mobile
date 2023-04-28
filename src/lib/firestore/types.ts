import type {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export enum UserRole {
  Student = 'STUDENT',
  Admin = 'ADMIN',
}

export interface FirestoreUserData {
  firstName: string;
  lastName: string;
}

export interface FirestoreUserReadOnlyData {
  createdAt: FirebaseFirestoreTypes.Timestamp;
  role: UserRole;
  unusedVideos: number;
}
