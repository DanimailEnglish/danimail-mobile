import React from "react";
import { ActivityIndicator } from "react-native";

import { Text } from "../../core";

export function ProcessingVideoTileContent() {
  return (
    <>
      <Text>Processing...</Text>
      <ActivityIndicator />
    </>
  );
}
