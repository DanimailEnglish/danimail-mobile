import { QueryDocumentSnapshot } from "firebase/firestore";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Firestore, FirestoreVideo, PaginationInfo } from "../../lib/firestore";
import { useCurrentUser, useUploads } from "../../providers";
import { VideoList } from "./VideoList";

const COLUMNS = 2;
const PAGE_SIZE = 10;

export function SentVideos() {
  const { authUser } = useCurrentUser();
  const { uploadStatuses, removeUploadStatus } = useUploads();
  const [queriedVideos, setQueriedVideos] = useState<
    QueryDocumentSnapshot<FirestoreVideo>[]
  >([]);
  const [uploadingVideos, setUploadingVideos] = useState<
    QueryDocumentSnapshot<FirestoreVideo>[]
  >([]);

  const videos = useMemo(() => {
    // The uploading videos update in real time and need to replace the static
    // ones from the regular query. Any leftover ones are assumed to have been
    // created after the initial load and are placed in front.
    const newQueriedVideos = [...queriedVideos];
    const filteredUploadingVideos = uploadingVideos.filter((uploadingVideo) => {
      const matchingVideoIndex = newQueriedVideos.findIndex(
        (queriedVideo) => queriedVideo.id === uploadingVideo.id,
      );
      if (matchingVideoIndex !== -1) {
        newQueriedVideos[matchingVideoIndex] = uploadingVideo;
        return false;
      }
      return true;
    });
    return [...filteredUploadingVideos, ...newQueriedVideos];
  }, [queriedVideos, uploadingVideos]);

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [pageInfo, setPageInfo] = useState<PaginationInfo<FirestoreVideo>>();

  const initialLoad = useRef(true);

  const loadVideos = useCallback(() => {
    if (authUser?.uid != null) {
      setLoading(true);

      const limit = (queriedVideos.length % COLUMNS) + PAGE_SIZE;
      Firestore.getSentVideos(authUser?.uid, {
        limit,
        after: pageInfo?.endCursor,
      })
        .then(({ data, paginationInfo }) => {
          setQueriedVideos((prevVideos) => [...prevVideos, ...data]);
          setPageInfo(paginationInfo);
          setLoading(false);
        })
        .catch(() => {
          setError("Error loading videos");
          setLoading(false);
        });
    }
  }, [authUser?.uid, pageInfo?.endCursor, queriedVideos.length]);

  const loadMore = useCallback(() => {
    if (!loading && pageInfo?.hasNextPage) {
      loadVideos();
    }
  }, [loadVideos, loading, pageInfo?.hasNextPage]);

  const handleDismissError = useCallback(() => {
    setError(undefined);
  }, []);

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      loadVideos();
    }
  }, [loadVideos]);

  useEffect(() => {
    const uploadStatusKeys = Object.keys(uploadStatuses);
    if (uploadStatusKeys.length > 0) {
      const subscriber = Firestore.onVideosSnapshot(
        uploadStatusKeys,
        (results) => {
          setUploadingVideos(results.docs);
          results.forEach((result) => {
            if (
              result.data().status !== "UPLOADING" &&
              result.data().status !== "PROCESSING"
            ) {
              setQueriedVideos((prevQueriedVideos) => [
                result,
                ...prevQueriedVideos,
              ]);
              removeUploadStatus(result.id);
            }
          });
        },
      );
      return subscriber;
    }
    return undefined;
  }, [removeUploadStatus, uploadStatuses]);

  return (
    <VideoList
      columns={COLUMNS}
      error={error}
      loadingTiles={loading ? (videos.length % COLUMNS) + COLUMNS : 0}
      onEndReached={loadMore}
      onErrorDismiss={handleDismissError}
      videos={videos}
    />
  );
}
