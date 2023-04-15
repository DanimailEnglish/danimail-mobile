import {Button, Text} from '@rneui/base';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Camera} from 'react-native-vision-camera';

export default function HomeScreen(): JSX.Element {
  const [cameraPermissions, setCameraPermissions] = useState<string>();
  const [microphonePermissions, setMicrophonePermissions] = useState<string>();

  useEffect(() => {
    async function getPermissions() {
      setCameraPermissions(await Camera.getCameraPermissionStatus());
      setMicrophonePermissions(await Camera.getMicrophonePermissionStatus());
    }

    getPermissions();
  }, []);

  const requestPermissions = useCallback(async () => {
    setCameraPermissions(await Camera.requestCameraPermission());
    setMicrophonePermissions(await Camera.requestMicrophonePermission());
  }, []);

  return (
    <SafeAreaView>
      <Text>Camera permissions: {cameraPermissions}</Text>
      <Text>Microphone permissions: {microphonePermissions}</Text>
      <Button onPress={requestPermissions}>Request Permissions</Button>
    </SafeAreaView>
  );
}
