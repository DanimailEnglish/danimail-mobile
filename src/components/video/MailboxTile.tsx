import { makeStyles } from "@rneui/themed";
import React from "react";
import type { StyleProp, ViewStyle } from "react-native";

import type { FirestoreVideo } from "../../lib/firestore";
import { Spacer } from "../core";
import { VideoTileContent } from "./tileContent/VideoTileContent";

const useStyles = makeStyles((theme) => ({
  container: {
    aspectRatio: "9/16",
    overflow: "hidden",
    backgroundColor: theme.colors.grey5,
  },
}));

export interface MailboxTileProps {
  videoId: string;
  videoData: FirestoreVideo;
  style?: StyleProp<ViewStyle>;
}

export function MailboxTile({ videoId, videoData, style }: MailboxTileProps) {
  const styles = useStyles();
  return (
    <Spacer
      alignItems="center"
      justifyContent="center"
      style={[styles.container, style]}
    >
      <VideoTileContent videoId={videoId} videoData={videoData} />
    </Spacer>
  );
}
