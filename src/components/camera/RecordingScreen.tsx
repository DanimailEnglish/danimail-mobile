import React, {useCallback, useRef, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Camera} from 'react-native-vision-camera';

import {Spacer} from '../core';
import {CameraPreview} from './CameraPreview';
import {RecordButton} from './RecordButton';

export function RecordingScreen() {
  const [recording, setRecording] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const camera = useRef<Camera>(null);

  const startRecording = useCallback(() => {
    camera.current?.startRecording({
      onRecordingFinished: video => {
        Alert.alert(`recording finished, video file: ${video.path}`);
      },
      onRecordingError: error => {
        Alert.alert(`error: ${error.message}`);
      },
    });
    setRecording(true);
  }, []);

  const stopRecording = useCallback(async () => {
    setButtonDisabled(true);
    await camera.current?.stopRecording();
    setButtonDisabled(false);
    setRecording(false);
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
