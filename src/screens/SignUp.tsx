import {Button, Input} from '@rneui/themed';
import React, {useCallback, useState} from 'react';
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';
import isEmail from 'validator/lib/isEmail';

import {Screen} from '../components';
import {signUpWithEmail} from '../lib/authentication';

export function SignUpScreen(): JSX.Element {
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
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setEmail(e.nativeEvent.text);
      if (!isEmail(e.nativeEvent.text)) {
        setEmailError('Email is invalid.');
      } else {
        setEmailError(undefined);
      }
    },
    [],
  );

  const handlePasswordChange = useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setPassword(e.nativeEvent.text);
      if (e.nativeEvent.text.length < 6) {
        setPasswordError('Password is not long enough.');
      } else {
        setPasswordError(undefined);
      }
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    setSubmitting(true);
    signUpWithEmail({
      email,
      password,
      onError: error => {
        setSubmitting(false);
        switch (error.code) {
          case 'auth/email-already-in-use':
            setEmailError('Email is already taken.');
            break;
          default:
            throw error;
        }
      },
      onSuccess: () => setSubmitting(false),
    });
  }, [email, password]);

  return (
    <Screen>
      <Input
        placeholder="Email"
        onChange={handleEmailChange}
        value={email}
        errorMessage={emailError}
        disabled={submitting}
      />
      <Input
        placeholder="Password"
        onChange={handlePasswordChange}
        value={password}
        errorMessage={passwordError}
        disabled={submitting}
        secureTextEntry
      />
      <Button onPress={handleSubmit} disabled={submitDisabled}>
        Sign Up
      </Button>
    </Screen>
  );
}
