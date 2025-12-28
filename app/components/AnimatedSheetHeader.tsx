import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import PhoneCallIcon from "./icons/PhoneCallIcon";
import { scale } from "@utils/scale";
import { StyleSheet } from "react-native";
import { paletts } from "@styles/paletts";

export const AnimatedSheetHeader = ({ headerVisibility, Icon }: any) => {
  const style = useAnimatedStyle(() => ({
    opacity: headerVisibility.value,
    transform: [
      { translateY: interpolate(headerVisibility.value, [0, 1], [-50, 0]) },
      { scale: interpolate(headerVisibility.value, [0, 1], [0.9, 1]) },
    ],
  }));

  return (
    <Animated.View style={[styles.sheetHeaderComp, style]}>
      {Icon ? (
        Icon
      ) : (
        <PhoneCallIcon color="white" height={scale(60)} width={scale(60)} />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sheetHeaderComp: {
    height: 100,
    aspectRatio: 1,
    backgroundColor: paletts.PURPLE500,
    alignSelf: "center",
    marginTop: -50,
    borderRadius: scale(16),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: paletts.PURPLE500,
    shadowOpacity: 0.4,
    shadowOffset: { height: 12, width: 0 },
    shadowRadius: 8,
  },
});
