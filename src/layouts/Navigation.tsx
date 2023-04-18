import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {HomeScreen, RecordVideoScreen} from '../screens';
import {RootStackParamList} from './types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="RecordVideo"
          component={RecordVideoScreen}
          options={{title: 'Record Video'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
