import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Camera,
  CameraCaptureError,
  VideoFile,
} from 'react-native-vision-camera';

import {Spacer} from '../core';
import {CameraPreview} from './CameraPreview';
import {RecordButton} from './RecordButton';

export interface RecordingViewProps {
  onRecordingFinished?: (video: VideoFile) => void;
  onRecordingError?: (error: CameraCaptureError) => void;
}

export function RecordingView({
  onRecordingError,
  onRecordingFinished,
}: RecordingViewProps) {
  const [recording, setRecording] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const camera = useRef<Camera>(null);

  const startRecording = useCallback(() => {
    camera.current?.startRecording({
      onRecordingFinished: video => {
        if (onRecordingFinished != null) onRecordingFinished(video);
        setRecording(false);
      },
      onRecordingError: error => {
        if (onRecordingError != null) onRecordingError(error);
        setRecording(false);
      },
    });
    setRecording(true);
  }, [onRecordingError, onRecordingFinished]);

  const stopRecording = useCallback(async () => {
    setButtonDisabled(true);
    await camera.current?.stopRecording();
    setButtonDisabled(false);
  }, []);

  const onRecordButtonPress = useCallback(async () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [stopRecording, startRecording, recording]);

  return (
    <Spacer flex={1}>
      <CameraPreview ref={camera} style={StyleSheet.absoluteFill} />
      <Spacer
        style={StyleSheet.absoluteFill}
        alignItems="center"
        justifyContent="flex-end"
        bottomSpacing={64}>
        <RecordButton
          onPress={onRecordButtonPress}
          recording={recording}
          disabled={buttonDisabled}
        />
      </Spacer>
    </Spacer>
  );
}
