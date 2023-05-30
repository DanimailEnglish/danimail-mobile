import { Icon, useTheme } from "@rneui/themed";
import React from "react";

import type { FirestoreVideo } from "../../../lib/firestore";
import { Spacer, Text } from "../../core";

export interface ErroredVideoTileContentProps {
  videoData: FirestoreVideo;
}

export function ErroredVideoTileContent({
  videoData: { error },
}: ErroredVideoTileContentProps) {
  const { theme } = useTheme();
  return (
    <Spacer spacing={8}>
      <Icon
        name="alert-circle-outline"
        type="material-community"
        color={theme.colors.error}
      />
      <Text textAlign="center">
        There was an error while processing your video.
      </Text>
      <Text textAlign="center">{error}</Text>
    </Spacer>
  );
}
