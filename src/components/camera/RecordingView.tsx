import { useIsFocused } from "@react-navigation/native";
import { Camera, CameraType } from "expo-camera";
import React, { useCallback, useRef, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet } from "react-native";

import { useIsAppForeground } from "../../lib/hooks";
import { Spacer } from "../core";
import { RecordButton } from "./RecordButton";

export interface RecordingViewProps {
  onRecordingFinished?: (video: { uri: string }) => void;
  onRecordingError?: (error: unknown) => void;
}

export function RecordingView({
  onRecordingError,
  onRecordingFinished,
}: RecordingViewProps) {
  const [recording, setRecording] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [ratio, setRatio] = useState<string>();

  const camera = useRef<Camera>(null);

  const isAppForeground = useIsAppForeground();
  const isFocused = useIsFocused();

  const selectRatio = useCallback(async () => {
    const ratios = await camera.current?.getSupportedRatiosAsync();
    // Choose 16:9 if available, otherwise just use default
    // This may need better selection logic in the future
    if (ratios != null && ratios.includes("16:9")) {
      setRatio("16:9");
    }
  }, []);

  const startRecording = useCallback(async () => {
    setRecording(true);
    try {
      const video = await camera.current?.recordAsync();
      if (onRecordingFinished != null) onRecordingFinished(video);
      setRecording(false);
    } catch (error: unknown) {
      if (onRecordingError != null) onRecordingError(error);
      setRecording(false);
    }
  }, [onRecordingError, onRecordingFinished]);

  const stopRecording = useCallback(() => {
    setButtonDisabled(true);
    camera.current?.stopRecording();
    setButtonDisabled(false);
  }, []);

  const onRecordButtonPress = useCallback(() => {
    if (recording) {
      stopRecording();
    } else {
      startRecording().catch(() => Alert.alert("Error while recording"));
    }
  }, [stopRecording, startRecording, recording]);

  return (
    <Spacer flex={1}>
      {isAppForeground && isFocused ? (
        <Camera
          ref={camera}
          onCameraReady={selectRatio}
          ratio={ratio}
          type={CameraType.front}
          style={StyleSheet.absoluteFill}
        />
      ) : (
        <ActivityIndicator style={StyleSheet.absoluteFill} />
      )}
      <Spacer
        style={StyleSheet.absoluteFill}
        alignItems="center"
        justifyContent="flex-end"
        bottomSpacing={64}
      >
        <RecordButton
          onPress={onRecordButtonPress}
          recording={recording}
          disabled={buttonDisabled}
        />
      </Spacer>
    </Spacer>
  );
}
