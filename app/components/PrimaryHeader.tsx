import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { scale } from "@utils/scale";
import { typography } from "@styles/typography";
import { paletts } from "@styles/paletts";
import ClockIcon from "@assets/images/Clock.svg";

type PrimaryHeaderProps = {
  title?: string;
  subtitle?: string;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  Icon?: React.ReactNode;
  mainContainerStyle?: ViewStyle;
};

export const PrimaryHeader = ({
  title,
  subtitle,
  titleStyle,
  subtitleStyle,
  Icon,
  mainContainerStyle,
}: PrimaryHeaderProps) => {
  return (
    <View style={[styles.topContainer, mainContainerStyle]}>
      <View style={{ gap: scale(6), maxWidth: "70%" }}>
        <Text
          style={[
            typography.h3,
            { fontWeight: "bold", color: paletts.WHITE000 },
            titleStyle,
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          style={[typography.l1, { color: paletts.PURPLE200 }, subtitleStyle]}
          numberOfLines={2}
        >
          {subtitle}
        </Text>
      </View>
      {Icon}
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: paletts.PURPLE500,
    height: scale(233),
    borderBottomRightRadius: scale(38),
    borderBottomLeftRadius: scale(38),
    paddingTop: scale(0),
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
  },
});
