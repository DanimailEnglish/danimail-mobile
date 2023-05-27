import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Skeleton } from "@rneui/base";
import { Camera } from "expo-camera";
import React, { useCallback, useEffect } from "react";
import { Alert, Linking, StyleSheet } from "react-native";

import { RecordingView, Screen, Spacer, Text } from "../components";
import type { RootStackParamList } from "../layouts";
import { isNodeError } from "../lib/isNodeError";

export type RecordVideoScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "RecordVideo"
>;

export function RecordVideoScreen({
  navigation,
}: RecordVideoScreenProps): JSX.Element {
  const [cameraPermission, requestCameraPermission] =
    Camera.useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] =
    Camera.useMicrophonePermissions();

  useEffect(() => {
    if (
      cameraPermission?.granted === false &&
      cameraPermission?.canAskAgain === true
    ) {
      requestCameraPermission().catch(() => {
        Alert.alert("Error while requesting camera permission");
      });
    }
    if (
      microphonePermission?.granted === false &&
      microphonePermission?.canAskAgain === true
    ) {
      requestMicrophonePermission().catch(() => {
        Alert.alert("Error while requesting microphone permission");
      });
    }
  }, [
    cameraPermission?.canAskAgain,
    cameraPermission?.granted,
    microphonePermission?.canAskAgain,
    microphonePermission?.granted,
    requestCameraPermission,
    requestMicrophonePermission,
  ]);

  const openSettings = useCallback(() => {
    Linking.openSettings().catch(() => Alert.alert("Error going to settings"));
  }, []);

  const handleRecordingFinished = useCallback(
    (video: { uri: string }) => {
      navigation.navigate("RecordingPreview", { videoFile: video.uri });
    },
    [navigation],
  );

  const handleRecordingError = useCallback((error: unknown) => {
    if (isNodeError(error)) {
      Alert.alert(`An error occurred while recording: ${error.message}`);
    }
  }, []);

  switch (cameraPermission?.granted && microphonePermission?.granted) {
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
