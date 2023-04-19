import {useIsFocused} from '@react-navigation/native';
import React, {forwardRef} from 'react';
import {ActivityIndicator, StyleProp, ViewStyle} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

import {useIsAppForeground} from '../../lib/hooks';

export interface CameraPreviewProps {
  style?: StyleProp<ViewStyle>;
}

const CameraPreview = forwardRef<Camera, CameraPreviewProps>(
  ({style}, ref): JSX.Element => {
    const isAppForeground = useIsAppForeground();
    const isFocused = useIsFocused();
    const devices = useCameraDevices();
    const device = devices.front || devices.back;

    if (device == null) {
      return <ActivityIndicator />;
    }

    return (
      <Camera
        ref={ref}
        device={device}
        video
        audio
        preset="medium"
        isActive={isAppForeground && isFocused}
        style={style}
      />
    );
  },
);

CameraPreview.displayName = 'CameraPreview';

export {CameraPreview};
