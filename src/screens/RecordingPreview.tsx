import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from '@rneui/themed';
import React, {useCallback, useEffect, useRef} from 'react';
import {Alert, StyleSheet} from 'react-native';
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
  const sentVideo = useRef(false);

  const handleSend = useCallback(() => {
    Alert.alert('Send video?', 'Are you sure you want to send this video?', [
      {text: "Don't send", style: 'cancel', onPress: () => {}},
      {
        text: 'Send',
        style: 'default',
        onPress: () => {
          console.log('Start the upload here');
          sentVideo.current = true;
          navigation.navigate('Home');
        },
      },
    ]);
  }, [navigation]);

  const memoizedSendButton = useCallback(
    () => <Button type="clear" title="Send" onPress={handleSend} />,
    [handleSend],
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: memoizedSendButton,
    });
  }, [memoizedSendButton, navigation]);

  useEffect(() => {
    const subscriber = navigation.addListener('beforeRemove', e => {
      if (sentVideo.current) {
        return;
      }

      e.preventDefault();
      Alert.alert(
        'Discard video?',
        'You have not sent this video yet. Are you sure you want to discard this recording?',
        [
          {text: "Don't leave", style: 'cancel'},
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.dispatch(e.data.action),
          },
        ],
      );
    });

    return subscriber;
  }, [navigation]);

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
