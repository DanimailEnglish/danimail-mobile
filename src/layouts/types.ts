import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { FirestoreVideo } from "../lib/firestore";
import type { MailboxTabs } from "../screens/Mailbox";

export type RootStackParamList = {
  Home: undefined;
  LogIn: undefined;
  SignUp: undefined;
  FinishSignUp: undefined;
  Mailbox: { tab?: MailboxTabs };
  Video: { video: FirestoreVideo };
  RecordVideo: undefined;
  RecordingPreview: { videoFile: string };
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
