import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { paletts } from "@styles/paletts";
import { scale } from "@utils/scale";
import { StyleSheet, View } from "react-native";
import { CalendarIcon } from "./icons/CalendarIcon";
import { ExpenseIcon } from "./icons/ExpenseIcon";
import { HomeIcon } from "./icons/HomeIcon";
import { LeaveIcon } from "./icons/LeaveIcon";
import { TaskIcon } from "./icons/TaskIcon";

const getIconByRouteName = (
  routeName: keyof MainTabParamList,
  color: string,
  isFocused: boolean,
) => {
  switch (routeName) {
    case "Home":
      return <HomeIcon color={color} isActive={isFocused} />;
    case "Attendance":
      return <CalendarIcon color={color}  isActive={isFocused}/>;
    case "Expense":
      return <ExpenseIcon color={color} isActive={isFocused} />;
    case "Leave":
      return <LeaveIcon color={color} isActive={isFocused} />;
    case "Task":
      return <TaskIcon color={color} isActive={isFocused}/>;
    default:
      return null;
  }
};

export function MyTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={index}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.tabItem,
              //   { backgroundColor: isFocused ? 'black' : 'transparent' },
            ]}
          >
            <View
              style={{
                borderBottomWidth: isFocused ? scale(2) : 0,
                borderColor: paletts.WHITE000,
                paddingBottom: scale(8),
              }}
            >
              {getIconByRouteName(
                route.name as keyof MainTabParamList,
                "white",
                isFocused,
              )}
            </View>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1C2020",
    flexDirection: "row",
    paddingBottom: scale(40),
    paddingTop: scale(20),
    alignItems: "center",
    justifyContent: "center",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: scale(70),
  },
});
