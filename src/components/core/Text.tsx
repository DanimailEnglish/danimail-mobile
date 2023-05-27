import { Text as RNEText, TextProps as RNETextProps } from "@rneui/themed";
import React from "react";
import type { TextStyle } from "react-native";

export interface TextProps extends RNETextProps {
  textAlign?: TextStyle["textAlign"];
}

export function Text({ textAlign, style, ...props }: TextProps) {
  return <RNEText style={[{ textAlign }, style]} {...props} />;
}
