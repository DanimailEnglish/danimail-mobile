import { useNavigation } from "@react-navigation/native";
import { Button, Input } from "@rneui/themed";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";

import { Screen } from "../components";
import type { RootStackNavigationProp } from "../layouts";
import { Functions } from "../lib/functions";
import { useCurrentUser } from "../providers";

export function FinishSignUp(): JSX.Element {
  const { firestoreUser } = useCurrentUser();
  const navigation = useNavigation<RootStackNavigationProp>();

  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState<string>();
  const [lastName, setLastName] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const submitDisabled =
    submitting ||
    firstNameError != null ||
    lastNameError != null ||
    firstName.length === 0 ||
    lastName.length === 0;

  const handleFirstNameChange = useCallback(
    ({
      nativeEvent: { text },
    }: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setFirstName(text);
      if (text.length === 0) {
        setFirstNameError("First name cannot be blank.");
      } else {
        setFirstNameError(undefined);
      }
    },
    [],
  );

  const handleLastNameChange = useCallback(
    ({
      nativeEvent: { text },
    }: NativeSyntheticEvent<TextInputChangeEventData>) => {
      setLastName(text);
      if (text.length === 0) {
        setLastNameError("First name cannot be blank.");
      } else {
        setLastNameError(undefined);
      }
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    setSubmitting(true);
    Functions.updateCurrentUser({
      firstName,
      lastName,
    })
      .finally(() => {
        setSubmitting(false);
      })
      .catch(() => {
        Alert.alert("Unknown error");
      });
  }, [firstName, lastName]);

  useEffect(() => {
    const subscriber = navigation.addListener("beforeRemove", (e) => {
      if (firestoreUser?.firstName == null || firestoreUser.lastName) {
        e.preventDefault();
      }
    });

    return subscriber;
  }, [firestoreUser?.firstName, firestoreUser?.lastName, navigation]);

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
