import BellIcon from "@components/icons/BellIcon";
import ChatBubbleIcon from "@components/icons/ChatBubbleIcon";
import VerifiedBadgeIcon from "@components/icons/VerifiedBadgeIcon";
import Screen from "@components/Screen";
import Avatar from "@components/ui/Avatar";
import { paletts } from "@styles/paletts";
import { typography } from "@styles/typography";
import { scale } from "@utils/scale";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CameraIcon from "@assets/images/Camera.svg";
import Container from "@components/ui/Container";
import { appStyles } from "@styles/appStyles";
import UsersSkelton from "@assets/images/Users.svg";
import TaskSkelton from "@assets/images/TaskDocs.svg";

const Home = () => {
  return (
    <Screen edges={["top"]} style={{ backgroundColor: paletts.WHITE000 }}>
      <View style={styles.root}>
        {/* header */}
        <View style={styles.header}>
          <View style={[styles.flexRow, { flex: 1 }]}>
            <Avatar
              data={[
                {
                  alt: "Tonald Drump",
                  source: require("@assets/images/avatar.png"),
                },
              ]}
              size={scale(54)}
            />

            <View style={{ width: "100%" }}>
              <View style={[styles.flexRow, { maxWidth: "65%" }]}>
                <Text
                  style={[typography.t1, { fontWeight: "500" }]}
                  numberOfLines={1}
                >
                  Tonald Drump
                </Text>
                <VerifiedBadgeIcon />
              </View>
              <Text
                style={[
                  typography.l1,
                  {
                    color: paletts.PURPLE600,
                    maxWidth: "75%",
                    fontWeight: "bold",
                  },
                ]}
                numberOfLines={1}
              >
                Junior Full Stack Developer
              </Text>
            </View>
          </View>

          <View style={[styles.flexRow, { justifyContent: "flex-end" }]}>
            <TouchableOpacity style={styles.circleIcon}>
              <ChatBubbleIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleIcon}>
              <BellIcon />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* work summary */}
          <TouchableOpacity style={[styles.workSummaryPoster]}>
            <View>
              <Text
                style={[
                  typography.t2,
                  { fontWeight: "bold", color: paletts.WHITE000 },
                ]}
              >
                My Work Summary
              </Text>
              <Text style={[typography.t3, { color: paletts.WHITE000 }]}>
                Today task & presence activity
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                right: -10,
              }}
            >
              <CameraIcon />
            </View>
          </TouchableOpacity>

          {/* today's meeting */}
          <Container style={{ gap: scale(12) }}>
            <View style={{ gap: scale(2) }}>
              <Text
                style={[
                  typography.b1,
                  { color: paletts.BLACK000, fontWeight: "bold" },
                ]}
              >
                Today Meeting
              </Text>
              <Text style={[typography.b3]}>Your schedule for the day</Text>
            </View>

            <View
              style={[
                appStyles.center,
                { gap: scale(12), paddingVertical: scale(12) },
              ]}
            >
              <UsersSkelton />

              <Text
                style={[
                  typography.b1,
                  { color: paletts.BLACK000, fontWeight: "bold" },
                ]}
              >
                No Meeting Available
              </Text>

              <Text style={[typography.l3, { textAlign: "center" }]}>
                It looks like you don’t have any meetings scheduled at the
                moment. This space will be updated as new meetings are added!
              </Text>
            </View>
          </Container>

          {/* today's tasks */}
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
              <Text style={[typography.b3]}>
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

              <Text style={[typography.l3, { textAlign: "center" }]}>
                It looks like you don’t have any tasks assigned to you right
                now. Don’t worry, this space will be updated as new tasks become
                available.
              </Text>
            </View>
          </Container>
        </ScrollView>
      </View>
    </Screen>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: paletts.WHITE300,
  },
  header: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(16),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: paletts.WHITE000,
    width: "100%",
  },
  flexRow: {
    alignItems: "center",
    justifyContent: "flex-start",
    gap: scale(8),
    flexDirection: "row",
  },
  circleIcon: {
    height: scale(40),
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 99999,
    backgroundColor: paletts.PURPLE50,
  },
  container: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(16),
    gap: scale(16),
    // flex: 1,
    // paddingBottom:scale(80)
  },
  workSummaryPoster: {
    width: "100%",
    backgroundColor: paletts.PURPLE500,
    overflow: "hidden",
    paddingHorizontal: scale(22),
    paddingVertical: scale(26),
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: scale(16),
    flexDirection: "row",
    position: "relative",
  },
});
