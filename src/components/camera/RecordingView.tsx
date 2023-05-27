import { Camera, CameraType } from "expo-camera";
import React, { useCallback, useRef, useState } from "react";
import { Alert, StyleSheet } from "react-native";

import { Spacer } from "../core";
import { CameraPreview } from "./CameraPreview";
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

  const camera = useRef<Camera>(null);

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
      <CameraPreview
        ref={camera}
        type={CameraType.front}
        style={StyleSheet.absoluteFill}
      />
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
