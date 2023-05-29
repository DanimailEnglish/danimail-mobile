import { onUserSnapshot } from "./users";
import { getReceivedVideos, getSentVideos } from "./videos";

export * from "./types";

export const Firestore = {
  onUserSnapshot,
  getReceivedVideos,
  getSentVideos,
};
