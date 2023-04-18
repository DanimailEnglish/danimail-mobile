import {useNavigation} from '@react-navigation/native';
import {Button} from '@rneui/base';
import React, {useCallback} from 'react';

import {Screen} from '../components';
import type {RootStackNavigationProp} from '../layouts';

export function HomeScreen(): JSX.Element {
  const navigation = useNavigation<RootStackNavigationProp>();
  const navToRecordVideo = useCallback(() => {
    navigation.navigate('RecordVideo');
  }, [navigation]);

  return (
    <Screen>
      <Button onPress={navToRecordVideo}>Record Video</Button>
    </Screen>
  );
}
