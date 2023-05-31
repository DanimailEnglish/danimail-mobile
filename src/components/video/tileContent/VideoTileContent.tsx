import React, { useEffect, useState } from "react";

import { Firestore, FirestoreVideo } from "../../../lib/firestore";
import { ErroredVideoTileContent } from "./ErroredVideoTileContent";
import { ProcessingVideoTileContent } from "./ProcessingVideoTileContent";
import { ReadyVideoTileContent } from "./ReadyVideoTileContent";
import { UploadingVideoTileContent } from "./UploadingVideoTileContent";

export interface VideoTileContentProps {
  videoId: string;
  videoData: FirestoreVideo;
}

export function VideoTileContent({
  videoId,
  videoData,
}: VideoTileContentProps) {
  const [updatedData, setUpdatedData] = useState<FirestoreVideo>();

  // Prioritize updatedData if it exists.
  const data = updatedData || videoData;

  // If the video's status is uploading or processing, we need to keep it
  // updated in real time. Once it transitions to ready or errored status,
  // we keep the final update but stop listening for new updates.
  useEffect(() => {
    if (data.status === "UPLOADING" || data.status === "PROCESSING") {
      const subscriber = Firestore.onVideoSnapshot(videoId, (videoDoc) => {
        setUpdatedData(videoDoc.data());
      });

      return subscriber;
    }
    return undefined;
  }, [data, videoId]);

  switch (data.status) {
    case "UPLOADING":
      return <UploadingVideoTileContent videoId={videoId} />;
    case "PROCESSING":
      return <ProcessingVideoTileContent />;
    case "READY":
      return <ReadyVideoTileContent videoData={data} />;
    case "PROCESSING_ERROR":
    case "UPLOADING_ERROR":
      return <ErroredVideoTileContent videoData={data} />;
    default:
      return null;
  }
}
