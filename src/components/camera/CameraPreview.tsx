import { useIsFocused } from "@react-navigation/native";
import { Camera, CameraType } from "expo-camera";
import React, { forwardRef } from "react";
import { ActivityIndicator, StyleProp, ViewStyle } from "react-native";

import { useIsAppForeground } from "../../lib/hooks";

export interface CameraPreviewProps {
  type?: CameraType;
  style?: StyleProp<ViewStyle>;
}

const CameraPreview = forwardRef<Camera, CameraPreviewProps>(
  ({ type, style }, ref): JSX.Element => {
    const isAppForeground = useIsAppForeground();
    const isFocused = useIsFocused();

    if (isAppForeground && isFocused) {
      return <Camera ref={ref} type={type} style={style} />;
    }
    return <ActivityIndicator style={style} />;
  },
);

CameraPreview.displayName = "CameraPreview";

export { CameraPreview };
