import {useNavigation} from '@react-navigation/native';
import {Button} from '@rneui/base';
import React, {useCallback} from 'react';

import {Screen, Spacer} from '../components';
import type {RootStackNavigationProp} from '../layouts';
import {logOut} from '../lib/authentication';
import {useCurrentUser} from '../providers';

export function HomeScreen(): JSX.Element {
  const currentUser = useCurrentUser();
  const navigation = useNavigation<RootStackNavigationProp>();

  const navToRecordVideo = useCallback(() => {
    navigation.navigate('RecordVideo');
  }, [navigation]);

  const navToLogIn = useCallback(() => {
    navigation.navigate('LogIn');
  }, [navigation]);

  const navToSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <Screen>
      {currentUser == null ? (
        <>
          <Spacer verticalSpacing={4}>
            <Button onPress={navToLogIn}>Log In</Button>
          </Spacer>
          <Spacer verticalSpacing={4}>
            <Button onPress={navToSignUp}>Sign Up</Button>
          </Spacer>
        </>
      ) : (
        <>
          <Spacer verticalSpacing={4}>
            <Button onPress={navToRecordVideo}>Record Video</Button>
          </Spacer>
          <Spacer verticalSpacing={4}>
            <Button onPress={logOut}>Log Out</Button>
          </Spacer>
        </>
      )}
    </Screen>
  );
}
