import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  RecordVideo: undefined;
  RecordingPreview: { videoFile: string };
  LogIn: undefined;
  SignUp: undefined;
  FinishSignUp: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
