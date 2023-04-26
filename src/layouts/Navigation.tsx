import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {useCurrentUser} from '../providers';
import {
  FinishSignUp,
  HomeScreen,
  LogInScreen,
  RecordVideoScreen,
  SignUpScreen,
} from '../screens';
import type {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  const {authUser, firestoreUser} = useCurrentUser();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />

        {authUser == null || firestoreUser == null ? (
          <>
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{title: 'Sign Up'}}
            />
            <Stack.Screen
              name="FinishSignUp"
              component={FinishSignUp}
              options={{title: 'Finish Sign Up', headerBackVisible: false}}
            />
            <Stack.Screen
              name="LogIn"
              component={LogInScreen}
              options={{title: 'Log In'}}
            />
          </>
        ) : (
          <Stack.Screen
            name="RecordVideo"
            component={RecordVideoScreen}
            options={{title: 'Record Video'}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
