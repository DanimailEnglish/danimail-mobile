import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ResizeMode, Video } from "expo-av";
import React from "react";
import { StyleSheet } from "react-native";

import { Spacer, Text } from "../components";
import type { RootStackParamList } from "../layouts";
import { muxPlaybackUrl } from "../lib/muxHelpers";

export type VideoScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Video"
>;

export function VideoScreen({
  route: {
    params: {
      video: { muxPlaybackId },
    },
  },
}: VideoScreenProps): JSX.Element {
  const videoUrl = muxPlaybackUrl(muxPlaybackId);

  if (videoUrl == null) {
    return (
      <Spacer flex={1} justifyContent="center" alignItems="center">
        <Text>Error loading video</Text>
      </Spacer>
    );
  }

  return (
    <Video
      source={{ uri: videoUrl }}
      useNativeControls
      resizeMode={ResizeMode.COVER}
      style={StyleSheet.absoluteFill}
    />
  );
}
