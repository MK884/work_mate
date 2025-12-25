import { StyleProp, ViewStyle } from "react-native";
import Animated, { FadeInLeft, FadeInRight, FadeInUp } from "react-native-reanimated";

type Props = {
  children: React.ReactNode;
  delay?: number;
  from?: 'up' | 'left' | 'right';
  style: StyleProp<ViewStyle>;
};

export const AnimatedIn = ({ children, delay = 0, from = 'up', style }: Props) => {
  const entering =
    from === 'left'
      ? FadeInLeft.delay(delay).springify()
      : from === 'right'
      ? FadeInRight.delay(delay).springify()
      : FadeInUp.delay(delay).springify();

  return (
    <Animated.View entering={entering} style={style}>
      {children}
    </Animated.View>
  );
};