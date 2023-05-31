import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Image } from "@rneui/themed";
import React, { useCallback } from "react";
import { StyleSheet, TouchableHighlight } from "react-native";

import type { RootStackParamList } from "../../../layouts";
import type { FirestoreVideo } from "../../../lib/firestore";
import { muxThumbnailUrl } from "../../../lib/muxHelpers";

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { aspectRatio: "9/16", width: "100%" },
});

export interface ReadyVideoTileContentProps {
  videoData: FirestoreVideo;
}

export function ReadyVideoTileContent({
  videoData,
}: ReadyVideoTileContentProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const navigateToVideo = useCallback(() => {
    navigation.navigate("Video", { video: videoData });
  }, [navigation, videoData]);

  return (
    <TouchableHighlight onPress={navigateToVideo} style={styles.container}>
      <Image
        source={{ uri: muxThumbnailUrl(videoData.muxPlaybackId) }}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableHighlight>
  );
}
