import {useNavigation} from '@react-navigation/native';
import {Button} from '@rneui/base';
import React, {useCallback} from 'react';

import {Screen, Spacer, Text} from '../components';
import type {RootStackNavigationProp} from '../layouts';
import {logOut} from '../lib/authentication';
import {useCurrentUser} from '../providers';

export function HomeScreen(): JSX.Element {
  const {authUser, firestoreUser} = useCurrentUser();
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
      {authUser == null ? (
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
            <Text>
              Welcome,{' '}
              {`${firestoreUser?.firstName} ${firestoreUser?.lastName}`}
            </Text>
          </Spacer>
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
