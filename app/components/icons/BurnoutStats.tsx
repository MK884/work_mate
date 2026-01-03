import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "@components/ui/Container";
import { scale } from "@utils/scale";
import { appStyles } from "@styles/appStyles";
import { typography } from "@styles/typography";
import { paletts } from "@styles/paletts";
import Chip from "@components/ui/Chip";
import SmileStatusIcon from "./SmileStatusIcon";
import SadStatusIcon from "./SadStatusIcon";

type BurnoutStatsProps = {
  goodLevel?: number;
  value?: number;
  title?: string;
  captionNode?: React.ReactNode;
};

const BurnoutStats = ({
  goodLevel = 90,
  value = 0,
  title = "Burnout Stats",
  captionNode = null,
}: BurnoutStatsProps) => {
  const isGoodLevel = value >= goodLevel;
  const backgroundColor = isGoodLevel ? paletts.GREEN400 : paletts.ORANGE400;
  const Icon = isGoodLevel ? <SmileStatusIcon /> : <SadStatusIcon />;
  const chipLabel = isGoodLevel ? "Good" : "Poor";
  return (
    <Container style={{ gap: scale(8) }}>
      <View
        style={[
          appStyles.flexRow,
          { gap: scale(6), justifyContent: "flex-start" },
        ]}
      >
        <Text
          style={[
            typography.t2,
            { fontWeight: "bold", color: paletts.BLACK000 },
          ]}
        >
          {title}
        </Text>
        <Chip label={chipLabel} containerStyle={{ backgroundColor }} />
      </View>

      {/* <Text style={[typography.l2, { color: paletts.GRAY300 }]}>
        You've maintain your task at the right pace! keep it up!
      </Text> */}
      {captionNode}

      <View style={styles.barBox}>
        {Icon}
        <View style={[styles.barContainer]}>
          <View
            style={[
              styles.bar,
              { width: `${Math.min(value, 100)}%`, backgroundColor },
            ]}
          />
        </View>
      </View>
    </Container>
  );
};

export default BurnoutStats;

const styles = StyleSheet.create({
  barBox: {
    padding: scale(8),
    borderRadius: scale(12),
    gap: scale(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: paletts.WHITE200,
    borderWidth: 1,
    borderColor: paletts.GRAY50,
    width: "100%",
  },
  barContainer: {
    flex: 1,
    height: scale(4),
    borderRadius: scale(16),
    backgroundColor: paletts.GRAY50,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    borderRadius: scale(16),
    backgroundColor: paletts.GREEN400,
  },
});
