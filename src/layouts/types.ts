import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  RecordVideo: undefined;
  LogIn: undefined;
  SignUp: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;