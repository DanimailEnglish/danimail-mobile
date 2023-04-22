import {Button, Skeleton} from '@rneui/base';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Linking, StyleSheet} from 'react-native';
import {Camera} from 'react-native-vision-camera';

import {RecordingView, Screen, Spacer, Text} from '../components';
import {useIsAppForeground} from '../lib/hooks';

export function RecordVideoScreen(): JSX.Element {
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
      return <RecordingView />;
    default:
      return <Skeleton style={StyleSheet.absoluteFill} />;
  }
}
