import {
  collection,
  FirestoreDataConverter,
  orderBy,
  query,
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
    where("status", "==", "READY"),
    orderBy("createdAt", "desc"),
  );
  return getPaginatedDocs(unpaginatedQuery, paginationOptions);
}
