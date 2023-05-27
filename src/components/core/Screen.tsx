import React from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
});

export interface ScreenProps {
  edges?: Edge[];
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function Screen({
  edges,
  scrollable = false,
  style,
  children,
}: ScreenProps): JSX.Element {
  if (edges?.length === 0) {
    if (scrollable) {
      return <ScrollView style={[styles.screen, style]}>{children}</ScrollView>;
    }
    return <View style={[styles.screen, style]}>{children}</View>;
  }

  if (scrollable) {
    return (
      <ScrollView>
        <SafeAreaView style={[styles.screen, style]} edges={edges}>
          {children}
        </SafeAreaView>
      </ScrollView>
    );
  }
  return (
    <SafeAreaView style={[styles.screen, style]} edges={edges}>
      {children}
    </SafeAreaView>
  );
}
