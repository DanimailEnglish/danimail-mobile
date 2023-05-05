import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from '@rneui/base';
import React, {useCallback} from 'react';

import {Screen, Spacer, Text} from '../components';
import type {RootStackParamList} from '../layouts';
import {logOut} from '../lib/authentication';
import {FirestoreUser} from '../lib/firestore';
import {useCurrentUser} from '../providers';

interface GreetingProps {
  user: FirestoreUser;
}

function Greeting({
  user: {firstName, lastName, createdAt},
}: GreetingProps): JSX.Element {
  const dayInMs = 24 * 60 * 60 * 1000;
  const timeDifference = Date.now() - createdAt.toMillis();
  const newUser = timeDifference / dayInMs < 1;

  return (
    <>
      <Text textAlign="center">
        {newUser ? 'Welcome,' : 'Welcome back,'} {firstName} {lastName}!
      </Text>
      {newUser && (
        <Text textAlign="center">Thank you for choosing Danimail</Text>
      )}
    </>
  );
}

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

export function HomeScreen({navigation}: HomeScreenProps): JSX.Element {
  const {authUser, firestoreUser} = useCurrentUser();

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
      {authUser == null || firestoreUser == null ? (
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
          <Spacer bottomSpacing={16}>
            <Greeting user={firestoreUser} />
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
