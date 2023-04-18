import {useIsFocused} from '@react-navigation/native';
import React, {forwardRef} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

import {useIsAppForeground} from '../lib/useIsAppForeground';

interface CameraViewProps {
  children?: React.ReactNode;
}

const CameraView = forwardRef<Camera, CameraViewProps>(
  ({children}, ref): JSX.Element => {
    const isAppForeground = useIsAppForeground();
    const isFocused = useIsFocused();
    const devices = useCameraDevices();
    const device = devices.front || devices.back;

    if (device == null) {
      return <ActivityIndicator />;
    }

    return (
      <>
        <Camera
          ref={ref}
          device={device}
          preset="medium"
          isActive={isAppForeground && isFocused}
          style={StyleSheet.absoluteFill}
        />
        <View style={StyleSheet.absoluteFill}>{children}</View>
      </>
    );
  },
);
CameraView.displayName = 'CameraView';

export {CameraView};
