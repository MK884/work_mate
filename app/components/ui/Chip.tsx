import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import React, { lazy } from "react";
import { scale } from "@utils/scale";
import { paletts } from "@styles/paletts";
import { typography } from "@styles/typography";
import TimerClockIcon from "@components/icons/TimerClockIcon";

type ChipProps = {
  Icon?: React.ReactNode;
  label?: string;
  labelStyle?: TextStyle;
  containerStyle?: ViewStyle;
};

const Chip = ({
  label="label",
  Icon = null,
  containerStyle,
  labelStyle,
}: ChipProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {Icon}
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </View>
  );
};

export default Chip;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: 9999,
    backgroundColor: paletts.GREEN400,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(4),
  },
  label: {
    ...typography.t3,
    color: paletts.WHITE000,
    fontWeight: "bold",
  },
});
