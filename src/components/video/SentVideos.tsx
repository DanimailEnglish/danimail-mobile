import { QueryDocumentSnapshot } from "firebase/firestore";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { Firestore, FirestoreVideo, PaginationInfo } from "../../lib/firestore";
import { useCurrentUser } from "../../providers";
import { VideoList } from "./VideoList";

const COLUMNS = 2;
const PAGE_SIZE = 10;

export function SentVideos() {
  const { authUser } = useCurrentUser();
  const [videos, setVideos] = useState<QueryDocumentSnapshot<FirestoreVideo>[]>(
    [],
  );

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [pageInfo, setPageInfo] = useState<PaginationInfo<FirestoreVideo>>();

  const initialLoad = useRef(true);

  const loadVideos = useCallback(() => {
    if (authUser?.uid != null) {
      setLoading(true);

      // Request enough to fill in incomplete rows
      const limit = (videos.length % COLUMNS) + PAGE_SIZE;
      Firestore.getPaginatedSentVideos(authUser?.uid, {
        limit,
        after: pageInfo?.endCursor,
      })
        .then(({ data, paginationInfo }) => {
          setVideos((prevVideos) => [...prevVideos, ...data]);
          setPageInfo(paginationInfo);
          setLoading(false);
        })
        .catch(() => {
          setError("Error loading videos");
          setLoading(false);
        });
    }
  }, [authUser?.uid, pageInfo?.endCursor, videos.length]);

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
    const latestVideo = videos[0];
    if (latestVideo != null && authUser?.uid != null) {
      const subscriber = Firestore.onNewSentVideosSnapshot(
        authUser.uid,
        latestVideo,
        (newVideos) => {
          setVideos((prevVideos) => [...newVideos.docs, ...prevVideos]);
        },
      );

      return subscriber;
    }
    return undefined;
  }, [authUser?.uid, videos]);

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
