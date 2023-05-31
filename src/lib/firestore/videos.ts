import {
  collection,
  doc,
  DocumentSnapshot,
  FirestoreDataConverter,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  where,
} from "firebase/firestore";

import { db } from "../../../firebaseConfig";
import { getPaginatedDocs, paginateQuery } from "./pagination";
import type { FirestoreVideo, PaginationOptions } from "./types";

export const videoConverter: FirestoreDataConverter<FirestoreVideo> = {
  toFirestore: (video) => video,
  fromFirestore: (videoDoc) => videoDoc.data() as FirestoreVideo,
};

export function videosCollection() {
  return collection(db, "videos").withConverter(videoConverter);
}

export function videosDoc(videoId: string) {
  return doc(videosCollection(), videoId);
}

export function onVideoSnapshot(
  videoId: string,
  onNext: (snapshot: DocumentSnapshot<FirestoreVideo>) => void,
  onError?: (error: Error) => void,
): () => void {
  return onSnapshot(videosDoc(videoId), onNext, onError);
}

export function sentVideosQuery(senderId: string) {
  return query(
    videosCollection(),
    where("senderId", "==", senderId),
    orderBy("createdAt", "desc"),
  );
}

export async function getPaginatedSentVideos(
  senderId: string,
  paginationOptions: PaginationOptions<FirestoreVideo>,
) {
  return getPaginatedDocs(sentVideosQuery(senderId), paginationOptions);
}

export function onNewSentVideosSnapshot(
  senderId: string,
  before: QueryDocumentSnapshot<FirestoreVideo>,
  onNext: (snapshot: QuerySnapshot<FirestoreVideo>) => void,
  onError?: (error: Error) => void,
): () => void {
  const q = paginateQuery(sentVideosQuery(senderId), { before });
  return onSnapshot(q, onNext, onError);
}
