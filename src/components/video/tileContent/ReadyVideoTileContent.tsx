import { Image } from "@rneui/themed";
import React from "react";
import { StyleSheet } from "react-native";

import type { FirestoreVideo } from "../../../lib/firestore";
import { muxThumbnailUrl } from "../../../lib/muxHelpers";

const styles = StyleSheet.create({
  image: { aspectRatio: "9/16", width: "100%" },
});

export interface ReadyVideoTileContentProps {
  videoData: FirestoreVideo;
}

export function ReadyVideoTileContent({
  videoData: { muxPlaybackId },
}: ReadyVideoTileContentProps) {
  return (
    <Image
      source={{ uri: muxThumbnailUrl(muxPlaybackId) }}
      style={styles.image}
      resizeMode="cover"
    />
  );
}
