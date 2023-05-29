import { Skeleton } from "@rneui/themed";
import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

import { Spacer } from "../core";

const styles = StyleSheet.create({
  container: { aspectRatio: "9/16", flex: 1 },
  skeleton: { height: "100%", width: "100%" },
});

export interface LoadingTileProps {
  style?: StyleProp<ViewStyle>;
}

export function LoadingTile({ style }: LoadingTileProps) {
  return (
    <Spacer style={[styles.container, style]}>
      <Skeleton animation="pulse" style={styles.skeleton} />
    </Spacer>
  );
}
