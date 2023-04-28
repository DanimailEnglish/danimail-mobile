import functions from '@react-native-firebase/functions';

export const updateCurrentUser = functions().httpsCallable('updateCurrentUser');
