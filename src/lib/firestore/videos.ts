import {
  collection,
  documentId,
  FirestoreDataConverter,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";

import { db } from "../../../firebaseConfig";
import { getPaginatedDocs } from "./pagination";
import type { FirestoreVideo, PaginationOptions } from "./types";

const videoConverter: FirestoreDataConverter<FirestoreVideo> = {
  toFirestore: (video) => video,
  fromFirestore: (videoDoc) => videoDoc.data() as FirestoreVideo,
};

function videosCollection() {
  return collection(db, "videos").withConverter(videoConverter);
}

export async function getReceivedVideos(
  userId: string,
  paginationOptions?: PaginationOptions<FirestoreVideo>,
) {
  const unpaginatedQuery = query(
    videosCollection(),
    where("recipientId", "==", userId),
    where("status", "==", "READY"),
    orderBy("createdAt", "desc"),
  );
  return getPaginatedDocs(unpaginatedQuery, paginationOptions);
}

export async function getSentVideos(
  userId: string,
  paginationOptions: PaginationOptions<FirestoreVideo>,
) {
  const unpaginatedQuery = query(
    videosCollection(),
    where("senderId", "==", userId),
    orderBy("createdAt", "desc"),
  );
  return getPaginatedDocs(unpaginatedQuery, paginationOptions);
}

export function onVideosSnapshot(
  videoIds: string[],
  onNext: (snapshot: QuerySnapshot<FirestoreVideo>) => void,
  onError?: (error: Error) => void,
): () => void {
  return onSnapshot(
    query(videosCollection(), where(documentId(), "in", videoIds)),
    onNext,
    onError,
  );
}
