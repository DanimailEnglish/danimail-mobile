import {Button, Input} from '@rneui/themed';
import React, {useCallback, useState} from 'react';
import {
  Alert,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import isEmail from 'validator/lib/isEmail';

import {Screen} from '../components';
import {logInWithEmail} from '../lib/authentication';

export function LogInScreen(): JSX.Element {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string>();
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const submitDisabled =
    submitting ||
    emailError != null ||
    passwordError != null ||
    email.length === 0 ||
    password.length === 0;

  const handleEmailChange = useCallback(
    ({nativeEvent: {text}}: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setEmail(text);
      if (!isEmail(text)) {
        setEmailError('Email is invalid.');
      } else {
        setEmailError(undefined);
      }
    },
    [],
  );

  const handlePasswordChange = useCallback(
    ({nativeEvent: {text}}: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setPassword(text);
      if (text.length < 6) {
        setPasswordError('Password is not long enough.');
      } else {
        setPasswordError(undefined);
      }
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    setSubmitting(true);
    logInWithEmail({
      email,
      password,
      onError: error => {
        setSubmitting(false);
        switch (error.code) {
          case 'auth/user-disabled':
            Alert.alert('This user has been disabled.');
            break;
          case 'auth/user-not-found':
            setEmailError('Email does not exist.');
            break;
          case 'auth/wrong-password':
            setPasswordError('Password is incorrect.');
            break;
          default:
            throw error;
        }
      },
    });
  }, [email, password]);

  return (
    <Screen scrollable>
      <Input
        label="Email"
        placeholder="example@abc.com"
        onChange={handleEmailChange}
        value={email}
        errorMessage={emailError}
        disabled={submitting}
      />
      <Input
        label="Password"
        placeholder="********"
        onChange={handlePasswordChange}
        value={password}
        errorMessage={passwordError}
        disabled={submitting}
        secureTextEntry
      />
      <Button onPress={handleSubmit} disabled={submitDisabled}>
        Log In
      </Button>
    </Screen>
  );
}
