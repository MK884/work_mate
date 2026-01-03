import ClockIcon from "@assets/images/Clock.svg";
import TaskSkelton from "@assets/images/TaskDocs.svg";
import { PrimaryHeader } from "@components/PrimaryHeader";
import Screen from "@components/Screen";
import SummaryCard from "@components/SummaryCard";
import { Button } from "@components/ui/Button";
import Container from "@components/ui/Container";
import { appStyles } from "@styles/appStyles";
import { paletts } from "@styles/paletts";
import { typography } from "@styles/typography";
import { scale } from "@utils/scale";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Attendance = () => {
  return (
    <Screen edges={["left", "right"]}>
      <PrimaryHeader
        Icon={<ClockIcon height={scale(120)} width={scale(120)} />}
        title="Let’s Clock-In!"
        subtitle="Don’t miss your clock in schedule"
      />

      <Container
        style={{
          marginHorizontal: scale(16),
          marginTop: scale(-60),
          gap: scale(16),
        }}
      >
        <View style={{ gap: scale(6) }}>
          <Text
            style={[
              typography.t2,
              { fontWeight: "bold", color: paletts.BLACK000 },
            ]}
          >
            Total Working Hour
          </Text>
          <Text style={[typography.t3, { color: paletts.GRAY300 }]}>
            Paid Period 1 Sept 2024 - 30 Sept 2024
          </Text>
        </View>

        <View style={styles.rowCenter}>
          <SummaryCard label="Today" value="00:00 Hrs" />
          <SummaryCard label="This Pay Period" value="00:00 Hrs" />
        </View>

        <Button
          title="Clock In"
          containerStyle={{
            paddingVertical: scale(14),
            borderRadius: scale(28),
          }}
          textStyle={{ fontWeight: "bold" }}
        />
      </Container>

      {/* working [period] */}
      <Container
        style={{
          marginHorizontal: scale(16),
          marginTop: scale(16),
          gap: scale(12),
        }}
      >
        <View style={{ gap: scale(2) }}>
          <Text
            style={[
              typography.b1,
              { color: paletts.BLACK000, fontWeight: "bold" },
            ]}
          >
            Working Period
          </Text>
          <Text style={[typography.b3, { color: paletts.GRAY300 }]}>
            Your working time in this paid period
          </Text>
        </View>

        <View
          style={[
            appStyles.center,
            { gap: scale(12), paddingVertical: scale(12) },
          ]}
        >
          <TaskSkelton />

          <Text
            style={[
              typography.b1,
              { color: paletts.BLACK000, fontWeight: "bold" },
            ]}
          >
            No Working Time Available
          </Text>

          <Text
            style={[
              typography.l3,
              { textAlign: "center", color: paletts.GRAY300 },
            ]}
          >
            It looks like you don’t have any working time in this period. Don’t
            worry, this space will be updated as new working time submitted.
          </Text>
        </View>
      </Container>
    </Screen>
  );
};

export default Attendance;

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(8),
    width: "100%",
  },
});
