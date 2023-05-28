import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { MailboxTabs } from "../screens/Mailbox";

export type RootStackParamList = {
  Home: undefined;
  RecordVideo: undefined;
  RecordingPreview: { videoFile: string };
  LogIn: undefined;
  SignUp: undefined;
  FinishSignUp: undefined;
  Mailbox: { tab?: MailboxTabs };
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
