import React from "react";
import { ActivityIndicator } from "react-native";

import { useUploads } from "../../../providers";
import { Text } from "../../core";

export interface UploadingVideoTileContentProps {
  videoId: string;
}

export function UploadingVideoTileContent({
  videoId,
}: UploadingVideoTileContentProps) {
  const { uploadProgresses } = useUploads();
  const uploadProgress = uploadProgresses[videoId];

  if (uploadProgress == null) {
    return <Text>Failed to complete upload</Text>;
  }

  return (
    <>
      <Text>Uploading...</Text>
      <Text>{Math.round(uploadProgress * 10000) / 100}%</Text>
      <ActivityIndicator />
    </>
  );
}
