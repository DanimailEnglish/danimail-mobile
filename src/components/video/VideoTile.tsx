import { Image } from "@rneui/themed";
import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import { Spacer } from "../core";

const styles = StyleSheet.create({
  container: { aspectRatio: "9/16" },
  image: { aspectRatio: "9/16", width: "100%" },
});

export interface VideoTileProps {
  imageUri?: string;
  style?: StyleProp<ViewStyle>;
}

export function VideoTile({ imageUri, style }: VideoTileProps) {
  return (
    <Spacer style={[styles.container, style]}>
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="cover"
      />
    </Spacer>
  );
}
