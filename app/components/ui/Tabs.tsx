import { paletts } from "@styles/paletts";
import { typography } from "@styles/typography";
import { scale } from "@utils/scale";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  createAnimatedComponent,
  LinearTransition,
} from "react-native-reanimated";

interface TabsProps {
  tabs: Tab[];
  onTabPress: (index: number) => void;
  activeBgColor?: string;
  inactiveBgColor?: string;
  activeTextColor?: string;
  inactiveTextColor?: string;
  activeCountBgColor?: string;
  inactiveCountBgColor?: string;
}

const Tabs = ({
  tabs = [],
  onTabPress,
  activeBgColor = paletts.PURPLE600,
  inactiveBgColor = "transparent",
  activeTextColor = paletts.WHITE000,
  inactiveTextColor = paletts.BLACK100,
  activeCountBgColor = paletts.RED500,
  inactiveCountBgColor = paletts.GRAY100,
}: TabsProps) => {
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);

  const formatCount = (count: number) => {
    if (count > 99) return "99+";
    return String(count);
  };

  const handleTabPress = (index: number) => {
    let nextIndex = 0;
    if (index >= 0 && index < tabs.length) {
      nextIndex = index;
    }
    setActiveTabIndex(nextIndex);
    onTabPress(nextIndex);
  };

  const getBgColor = (index: number) => {
    if (index === activeTabIndex) {
      return activeBgColor;
    }
    return inactiveBgColor;
  };

  const getLabelColor = (index: number) => {
    if (index === activeTabIndex) {
      return activeTextColor;
    }
    return inactiveTextColor;
  };

  const getCountBgColor = (index: number) => {
    if (index === activeTabIndex) {
      return activeCountBgColor;
    }
    return inactiveCountBgColor;
  };

  const AnimatedTouchableOpacity = createAnimatedComponent(Pressable);

  return (
    <View style={[styles.conatiner]}>
      {tabs?.map((tab, index) => (
        <AnimatedTouchableOpacity
          layout={LinearTransition}
          style={[
            styles.tab,
            {
              backgroundColor: tab?.isDisabled
                ? paletts.GRAY50
                : getBgColor(index),
            },
          ]}
          onPress={() => handleTabPress(index)}
          key={index}
          disabled={tab?.isDisabled}
        >
          <Text
            style={[
              typography.t3,
              {
                color: tab?.isDisabled ? paletts.GRAY400 : getLabelColor(index),
              },
            ]}
          >
            {tab?.label}
          </Text>
          {tab?.count > 0 && (
            <View
              style={[
                styles.countContainer,
                { backgroundColor: getCountBgColor(index) },
              ]}
            >
              <Text style={[typography.b3, { color: paletts.WHITE100 }]}>
                {formatCount(tab.count)}
              </Text>
            </View>
          )}
        </AnimatedTouchableOpacity>
      ))}
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: paletts.WHITE000,
    width: "100%",
    padding: scale(2),
    borderRadius: 9999,
    gap: scale(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  tab: {
    gap: scale(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    flex: 1,
    backgroundColor: paletts.PURPLE600,
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
  },
  //   countContainer: {
  //     aspectRatio: 1,
  //     height: scale(16),
  //     borderRadius: 9999,
  //     backgroundColor: paletts.RED500,
  //     alignItems: "center",
  //     justifyContent: "center",
  //   },
  countContainer: {
    minWidth: scale(16),
    height: scale(16),
      paddingHorizontal: scale(4),
    borderRadius: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
});
