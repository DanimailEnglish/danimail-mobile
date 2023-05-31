import { onUserSnapshot } from "./users";
import {
  getPaginatedSentVideos,
  onNewSentVideosSnapshot,
  onVideoSnapshot,
} from "./videos";

export * from "./types";

export const Firestore = {
  // Users
  onUserSnapshot,

  // Videos
  onVideoSnapshot,
  onNewSentVideosSnapshot,
  getPaginatedSentVideos,
};
