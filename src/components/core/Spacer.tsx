import React from 'react';
import {FlexStyle, View, ViewStyle} from 'react-native';

export interface SpacerProps {
  spacing?: number;
  horizontalSpacing?: number;
  verticalSpacing?: number;
  leftSpacing?: number;
  topSpacing?: number;
  rightSpacing?: number;
  bottomSpacing?: number;
  flex?: number;
  justifyContent?: FlexStyle['justifyContent'];
  alignItems?: FlexStyle['alignItems'];
  style?: ViewStyle;
  children?: React.ReactNode;
}

export function Spacer({
  spacing = 0,
  horizontalSpacing,
  verticalSpacing,
  leftSpacing,
  topSpacing,
  rightSpacing,
  bottomSpacing,
  flex,
  justifyContent,
  alignItems,
  style,
  children,
}: SpacerProps) {
  const spacerStyle = {
    paddingLeft: leftSpacing || horizontalSpacing || spacing,
    paddingTop: topSpacing || verticalSpacing || spacing,
    paddingRight: rightSpacing || horizontalSpacing || spacing,
    paddingBottom: bottomSpacing || verticalSpacing || spacing,
    flex,
    justifyContent,
    alignItems,
  };

  return <View style={[spacerStyle, style]}>{children}</View>;
}
