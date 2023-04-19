import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
});

export interface ScreenProps {
  edges?: Edge[];
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function Screen({edges, style, children}: ScreenProps): JSX.Element {
  if (edges?.length === 0) {
    return <View style={[styles.screen, style]}>{children}</View>;
  }
  return (
    <SafeAreaView style={[styles.screen, style]} edges={edges}>
      {children}
    </SafeAreaView>
  );
}
