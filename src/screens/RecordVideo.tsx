import {Button, Text} from '@rneui/base';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Linking} from 'react-native';
import {Camera} from 'react-native-vision-camera';

import {Screen} from '../components';
import {CameraView} from '../components/CameraView';
import {useIsAppForeground} from '../lib/useIsAppForeground';

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
          <Text>You denied access to your camera and/or microphone.</Text>
          <Text>Please go to your settings to enable access for Danimail.</Text>
          <Button onPress={openSettings}>Go to Settings</Button>
        </Screen>
      );
    case true:
      return (
        <CameraView>
          <Screen>
            <Text>Hi</Text>
          </Screen>
        </CameraView>
      );
    default:
      return (
        <Screen>
          <Text>Permissions processing</Text>
        </Screen>
      );
  }
}
