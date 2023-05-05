import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, Skeleton} from '@rneui/base';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, Linking, StyleSheet} from 'react-native';
import {
  Camera,
  CameraCaptureError,
  VideoFile,
} from 'react-native-vision-camera';

import {RecordingView, Screen, Spacer, Text} from '../components';
import type {RootStackParamList} from '../layouts';
import {useIsAppForeground} from '../lib/hooks';

export type RecordVideoScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'RecordVideo'
>;

export function RecordVideoScreen({
  navigation,
}: RecordVideoScreenProps): JSX.Element {
  const [permissionsGranted, setPermissionsGranted] = useState<boolean>();
  const permissionsRequested = useRef<boolean>(false);

  const isAppForeground = useIsAppForeground();

  useEffect(() => {
    async function getPermissions() {
      if (!isAppForeground) {
        return;
      }

      let cameraPermissions = await Camera.getCameraPermissionStatus();
      let micPermissions = await Camera.getMicrophonePermissionStatus();

      if (!permissionsRequested.current) {
        permissionsRequested.current = true;
        if (cameraPermissions !== 'authorized') {
          cameraPermissions = await Camera.requestCameraPermission();
        }
        if (micPermissions !== 'authorized') {
          micPermissions = await Camera.requestMicrophonePermission();
        }
      }

      setPermissionsGranted(
        cameraPermissions === 'authorized' && micPermissions === 'authorized',
      );
    }

    getPermissions();
  }, [isAppForeground]);

  const openSettings = useCallback(() => {
    Linking.openSettings();
  }, []);

  const handleRecordingFinished = useCallback(
    (video: VideoFile) => {
      navigation.navigate('RecordingPreview', {videoFile: video.path});
    },
    [navigation],
  );

  const handleRecordingError = useCallback((error: CameraCaptureError) => {
    Alert.alert(`An error occurred while recording: ${error.message}`);
  }, []);

  switch (permissionsGranted) {
    case false:
      return (
        <Screen>
          <Spacer justifyContent="center" verticalSpacing={32}>
            <Text textAlign="center">
              Danimail does not have permission to use your camera and/or
              microphone. Please go to your phone settings to give permission
              for Danimail.
            </Text>
          </Spacer>
          <Button onPress={openSettings}>Go to Settings</Button>
        </Screen>
      );
    case true:
      return (
        <RecordingView
          onRecordingError={handleRecordingError}
          onRecordingFinished={handleRecordingFinished}
        />
      );
    default:
      return <Skeleton style={StyleSheet.absoluteFill} />;
  }
}
