import { httpsCallable } from "firebase/functions";

import { functions } from "../../../firebaseConfig";
import type { FirestoreVideo } from "../firestore";

export type CreateVideoParams = Partial<
  Pick<FirestoreVideo, "recipientId" | "replyToVideoId">
>;
export type CreateVideoData = {
  videoId: string;
  uploadUrl: string;
};

export const createVideo = httpsCallable<CreateVideoParams, CreateVideoData>(
  functions,
  "createVideo",
);
