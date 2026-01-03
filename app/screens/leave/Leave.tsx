import LeaveBagIcon from "@assets/images/LeaveBag.svg";
import TrolleyIcon from "@assets/images/Trolley.svg";
import { PrimaryHeader } from "@components/PrimaryHeader";
import Screen from "@components/Screen";
import SummaryCard from "@components/SummaryCard";
import Container from "@components/ui/Container";
import Tabs from "@components/ui/Tabs";
import { appStyles } from "@styles/appStyles";
import { paletts } from "@styles/paletts";
import { typography } from "@styles/typography";
import { scale } from "@utils/scale";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const tabs: Array<Tab> = [
  {
    label: "Review",
    count: 0,
  },
  {
    label: "Approved",
    count: 0,
  },
  {
    label: "Rejected",
    count: 0,
  },
];

const Leave = () => {
  return (
    <Screen edges={["left", "right"]}>
      <PrimaryHeader
        title="Leave Summary"
        subtitle="Submit Leave."
        Icon={
          <View style={{ marginRight: -18, marginTop: 30 }}>
            <LeaveBagIcon height={120} width={120} />
          </View>
        }
      />

      <View style={{ padding: scale(16), gap: scale(16) }}>
        <Container
          style={{
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
              Total Leave
            </Text>
            <Text style={[typography.t3, { color: paletts.GRAY300 }]}>
              Period 1 Jan 2024 - 30 Dec 2024
            </Text>
          </View>

          <View style={styles.rowCenter}>
            <SummaryCard
              label="Available"
              value="0"
              containerStyle={{ paddingHorizontal: scale(8) }}
              Icon={
                <View
                  style={[styles.circle, { backgroundColor: paletts.GREEN400 }]}
                />
              }
            />
            <SummaryCard
              label="Leave Used"
              value="0"
              containerStyle={{ paddingHorizontal: scale(8) }}
              Icon={<View style={[styles.circle]} />}
            />
          </View>
        </Container>

        <Tabs tabs={tabs} onTabPress={() => {}} />

        <Container style={{ gap: scale(12) }}>
          <View
            style={[
              appStyles.center,
              {
                gap: scale(12),
                paddingVertical: scale(12),
                marginTop: scale(28),
              },
            ]}
          >
            <TrolleyIcon />

            <Text
              style={[
                typography.b1,
                { color: paletts.BLACK000, fontWeight: "bold" },
              ]}
            >
              No Leave Submitted!
            </Text>

            <Text
              style={[
                typography.l3,
                { textAlign: "center", color: paletts.GRAY300 },
              ]}
            >
              Ready to catch some fresh air? Click “Submit Leave” and take that
              well-deserved break!
            </Text>
          </View>
        </Container>
      </View>
    </Screen>
  );
};

export default Leave;

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(8),
    width: "100%",
  },
  circle: {
    aspectRatio: 1,
    height: scale(12),
    borderRadius: 9999,
    backgroundColor: paletts.PURPLE600,
  },
});
