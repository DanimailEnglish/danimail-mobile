import React from "react";

import type { FirestoreVideo } from "../../../lib/firestore";
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
  switch (videoData.status) {
    case "PROCESSING":
      return <ProcessingVideoTileContent />;
    case "UPLOADING":
      return <UploadingVideoTileContent videoId={videoId} />;
    case "READY":
      return <ReadyVideoTileContent videoData={videoData} />;
    case "PROCESSING_ERROR":
    case "UPLOADING_ERROR":
      return <ErroredVideoTileContent videoData={videoData} />;
    default:
      return null;
  }
}
