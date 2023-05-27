import { useTheme } from "@rneui/themed";
import React from "react";
import {
  StyleSheet,
  TouchableHighlight,
  TouchableHighlightProps,
  View,
} from "react-native";

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderRadius: 64,
    height: 64,
    justifyContent: "center",
    width: 64,
  },
  recordIcon: {
    borderRadius: 24,
    height: 24,
    width: 24,
  },
  stopIcon: {
    height: 24,
    width: 24,
  },
});

export interface RecordButtonProps extends TouchableHighlightProps {
  recording: boolean;
  disabled: boolean;
}

export function RecordButton({
  recording,
  disabled,
  style,
  ...props
}: RecordButtonProps) {
  const { theme } = useTheme();
  return (
    <TouchableHighlight
      style={[styles.button, { backgroundColor: theme.colors.white }, style]}
      disabled={disabled}
      {...props}
    >
      <View
        style={
          recording
            ? [styles.stopIcon, { backgroundColor: theme.colors.black }]
            : [styles.recordIcon, { backgroundColor: theme.colors.error }]
        }
      />
    </TouchableHighlight>
  );
}
