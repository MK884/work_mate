import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "@components/Screen";
import { paletts } from "@styles/paletts";
import { scale } from "@utils/scale";
import ClockIcon from "@assets/images/Clock.svg";
import { typography } from "@styles/typography";
import Container from "@components/ui/Container";
import { Button } from "@components/ui/Button";
import { appStyles } from "@styles/appStyles";
import TimerClockIcon from "@components/icons/TimerClockIcon";
import TaskSkelton from "@assets/images/TaskDocs.svg";

const Attendance = () => {
  return (
    <Screen edges={["left", "right"]}>
      <View style={styles.topContainer}>
        <View style={{ gap: scale(6) }}>
          <Text
            style={[
              typography.t2,
              { fontWeight: "bold", color: paletts.WHITE000 },
            ]}
          >
            Let’s Clock-In!
          </Text>
          <Text style={[typography.t3, { color: paletts.WHITE000 }]}>
            Don’t miss your clock in schedule
          </Text>
        </View>
        <ClockIcon height={scale(120)} width={scale(120)} />
      </View>

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
          <View style={[styles.clockBox]}>
            <View
              style={[
                appStyles.flexRow,
                { justifyContent: "flex-start", gap: scale(4) },
              ]}
            >
              <TimerClockIcon />
              <Text
                style={[typography.l2, { color: paletts.GRAY700 }]}
                numberOfLines={1}
              >
                Today
              </Text>
            </View>

            <Text numberOfLines={1} style={[typography.p1]}>
              00:00 Hrs
            </Text>
          </View>
          <View style={[styles.clockBox]}>
            <View
              style={[
                appStyles.flexRow,
                { justifyContent: "flex-start", gap: scale(4) },
              ]}
            >
              <TimerClockIcon />
              <Text
                style={[typography.l2, { color: paletts.GRAY700 }]}
                numberOfLines={1}
              >
                This Pay Period
              </Text>
            </View>

            <Text numberOfLines={1} style={[typography.p1]}>
              00:00 Hrs
            </Text>
          </View>
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
          <Text style={[typography.b3]}>
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

          <Text style={[typography.l3, { textAlign: "center" }]}>
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
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(8),
    width: "100%",
  },
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
