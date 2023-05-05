import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from '@rneui/themed';
import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import Video from 'react-native-video';

import type {RootStackParamList} from '../layouts';

export type RecordingPreviewScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'RecordingPreview'
>;

export function RecordingPreviewScreen({
  route: {
    params: {videoFile},
  },
  navigation,
}: RecordingPreviewScreenProps): JSX.Element {
  const handleSend = useCallback(() => {
    console.log('send the video');
  }, []);

  const memoizedSendButton = useCallback(
    () => <Button type="clear" title="Send" onPress={handleSend} />,
    [handleSend],
  );

  navigation.setOptions({
    headerRight: memoizedSendButton,
  });

  return (
    <Video
      source={{uri: videoFile}}
      controls
      resizeMode="cover"
      muted={false}
      style={StyleSheet.absoluteFill}
    />
  );
}
