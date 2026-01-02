import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { scale } from "@utils/scale";
import { paletts } from "@styles/paletts";

type ContainerProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

const Container = ({ children, style }: ContainerProps) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default Container;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    backgroundColor: paletts.WHITE000,
    borderRadius: scale(8),
  },
});
