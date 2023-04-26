import {useNavigation} from '@react-navigation/native';
import {Button, Input} from '@rneui/themed';
import React, {useCallback, useEffect, useState} from 'react';
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';

import {Screen} from '../components';
import type {RootStackNavigationProp} from '../layouts';
import {Firestore} from '../lib/firestore';
import {useCurrentUser} from '../providers';

export function FinishSignUp(): JSX.Element {
  const {authUser, firestoreUser} = useCurrentUser();
  const navigation = useNavigation<RootStackNavigationProp>();

  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState<string>();
  const [lastName, setLastName] = useState<string>('');
  const [lastNameError, setLastNameError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const submitDisabled =
    submitting ||
    firstNameError != null ||
    lastNameError != null ||
    firstName.length === 0 ||
    lastName.length === 0;

  const handleFirstNameChange = useCallback(
    ({nativeEvent: {text}}: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setFirstName(text);
      if (text.length === 0) {
        setFirstNameError('First name cannot be blank.');
      } else {
        setFirstNameError(undefined);
      }
    },
    [],
  );

  const handleLastNameChange = useCallback(
    ({nativeEvent: {text}}: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setLastName(text);
      if (text.length === 0) {
        setLastNameError('First name cannot be blank.');
      } else {
        setLastNameError(undefined);
      }
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    if (authUser == null) return;
    setSubmitting(true);
    Firestore.Users.create(authUser.uid, {firstName, lastName});
    setSubmitting(false);
  }, [authUser, firstName, lastName]);

  useEffect(() => {
    const subscriber = navigation.addListener('beforeRemove', e => {
      if (firestoreUser == null) {
        e.preventDefault();
      }
    });

    return subscriber;
  }, [firestoreUser, navigation]);

  return (
    <Screen scrollable>
      <Input
        label="First name"
        onChange={handleFirstNameChange}
        value={firstName}
        errorMessage={firstNameError}
        disabled={submitting}
      />
      <Input
        label="Last Name"
        onChange={handleLastNameChange}
        value={lastName}
        errorMessage={lastNameError}
        disabled={submitting}
      />
      <Button onPress={handleSubmit} disabled={submitDisabled}>
        Submit
      </Button>
    </Screen>
  );
}
