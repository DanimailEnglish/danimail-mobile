import { onUserSnapshot } from "./users";
import { getReceivedVideos, getSentVideos, onVideosSnapshot } from "./videos";

export * from "./types";

export const Firestore = {
  onUserSnapshot,
  onVideosSnapshot,
  getReceivedVideos,
  getSentVideos,
};
