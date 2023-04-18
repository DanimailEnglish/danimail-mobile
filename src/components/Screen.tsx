import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';

interface ScreenProps {
  edges?: Edge[];
  children?: React.ReactNode;
}

const styles = StyleSheet.create({
  screen: {
    padding: 24,
  },
});

export function Screen({edges, children}: ScreenProps): JSX.Element {
  if (edges?.length === 0) {
    return <View style={styles.screen}>{children}</View>;
  }
  return (
    <SafeAreaView style={styles.screen} edges={edges}>
      {children}
    </SafeAreaView>
  );
}
