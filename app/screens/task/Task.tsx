import NotePadIcon from "@assets/images/NotePad.svg";
import BurnoutStats from "@components/icons/BurnoutStats";
import CodeCircleIcon from "@components/icons/CodeCircleIcon";
import ElapsedTimeIcon from "@components/icons/ElapsedTimeIcon";
import SuccessClockIcon from "@components/icons/SuccessClockIcon";
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
import TaskSkelton from "@assets/images/TaskDocs.svg";

const tabs: Array<Tab> = [
  {
    label: "All",
    count: 0,
  },
  {
    label: "In Progress",
    count: 0,
  },
  {
    label: "Done",
    count: 0,
  },
];

const Task = () => {
  return (
    <Screen edges={["left", "right"]}>
      <PrimaryHeader
        title="Challenges Awaiting"
        subtitle="Let’s tackle your to do list"
        Icon={<NotePadIcon height={120} width={120} />}
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
              Summary of Your Work
            </Text>
            <Text style={[typography.t3, { color: paletts.GRAY300 }]}>
              Your current task progress
            </Text>
          </View>

          <View style={styles.rowCenter}>
            <SummaryCard
              label="To Do"
              value="0"
              containerStyle={{ paddingHorizontal: scale(8) }}
              Icon={<CodeCircleIcon />}
            />
            <SummaryCard
              label="In Progress"
              value="0"
              containerStyle={{ paddingHorizontal: scale(8) }}
              Icon={<ElapsedTimeIcon />}
            />
            <SummaryCard
              label="Done"
              value="0"
              containerStyle={{ paddingHorizontal: scale(8) }}
              Icon={<SuccessClockIcon />}
            />
          </View>
        </Container>

        <BurnoutStats
          value={100}
          captionNode={
            <Text style={[typography.l2, { color: paletts.GRAY300 }]}>
              You've maintain your task at the right pace! keep it up!
            </Text>
          }
        />

        <Tabs tabs={tabs} onTabPress={() => {}} />

        <Container style={{ gap: scale(12) }}>
          <View style={{ gap: scale(2) }}>
            <Text
              style={[
                typography.b1,
                { color: paletts.BLACK000, fontWeight: "bold" },
              ]}
            >
              Today Task
            </Text>
            <Text style={[typography.b3, { color: paletts.GRAY300 }]}>
              The tasks assigned to you for today
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
              No Tasks Assigned
            </Text>

            <Text
              style={[
                typography.l3,
                { textAlign: "center", color: paletts.GRAY300 },
              ]}
            >
              It looks like you don’t have any tasks assigned to you right now.
              Don’t worry, this space will be updated as new tasks become
              available.
            </Text>
          </View>
        </Container>
      </View>
    </Screen>
  );
};

export default Task;

const styles = StyleSheet.create({
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(8),
    width: "100%",
  },
});
