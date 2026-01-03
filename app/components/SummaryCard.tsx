import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { appStyles } from "@styles/appStyles";
import TimerClockIcon from "./icons/TimerClockIcon";
import { typography } from "@styles/typography";
import { paletts } from "@styles/paletts";
import { scale } from "@utils/scale";

type SummaryCardProps = {
  Icon?: React.ReactNode;
  label?: string;
  value?: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
};

const SummaryCard = ({
  Icon = <TimerClockIcon />,
  label = "Label",
  value = "--",
  containerStyle,
  labelStyle,
  valueStyle,
}: SummaryCardProps) => {
  return (
    <View style={[styles.clockBox, containerStyle]}>
      <View
        style={[
          appStyles.flexRow,
          { justifyContent: "flex-start", gap: scale(4) },
        ]}
      >
        {Icon}
        <Text
          style={[typography.l2, { color: paletts.GRAY700,flex:1 }, labelStyle]}
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>

      <Text numberOfLines={1} style={[typography.p1, valueStyle]}>
        {value}
      </Text>
    </View>
  );
};

export default SummaryCard;

const styles = StyleSheet.create({
  clockBox: {
    flex: 1,
    gap: scale(10),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: paletts.GRAY50,
    backgroundColor: paletts.WHITE200,
    padding: scale(16),
  },
});
