import type { Timestamp } from "firebase/firestore";

export interface FirestoreUser {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  email?: string;
  phoneNumber?: string | null;
  firstName?: string;
  lastName?: string;
  nickname?: string | null;
  role: "STUDENT" | "ADMIN";
  unusedVideos: number;
}

export interface FirestoreVideo {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  senderId: string;
  recipientId: string;
  replyToVideoId?: string;
  muxUploadId: string;
  muxAssetId?: string;
  playbackUrl?: string;
  status:
    | "UPLOADING"
    | "UPLOADING_ERROR"
    | "PROCESSING"
    | "PROCESSING_ERROR"
    | "READY";
  error?: string;
}
