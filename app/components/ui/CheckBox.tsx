import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { paletts } from '@styles/paletts';
import { scale } from '@utils/scale';
import CheckIcon from '@components/icons/CheckIcon';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface CheckBoxProp {
  varient?: 'box' | 'circle';
  containerStyle?: StyleProp<ViewStyle>;
  activeBgColor?: string;
  activeBorderColor?: string;
  check?: boolean;
}

type Props = TouchableOpacityProps & CheckBoxProp;

const CheckBox = ({
  disabled,
  varient = 'box',
  containerStyle,
  activeBorderColor = paletts.PURPLE600,
  activeBgColor = paletts.PURPLE50,
  check = false,
  ...rest
}: Props) => {
  const isBox = varient === 'box';
  const backgroundColor = disabled ? paletts.GRAY50 : activeBgColor;
  const borderColor = disabled ? paletts.GRAY300 : activeBorderColor;
  const borderRadius = isBox ? scale(4) : 9999;

  const pressScale = useSharedValue(1);
  const pressOpacity = useSharedValue(0);

  const glowStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pressScale.value }],
      opacity: pressOpacity.value,
    };
  });

  const onPressIn = () => {
    pressScale.value = withTiming(1.4, { duration: 180 });
    pressOpacity.value = withTiming(0.25, { duration: 120 });
  };

  const onPressOut = () => {
    pressScale.value = withTiming(1, { duration: 180 });
    pressOpacity.value = withTiming(0, { duration: 150 });
  };

  return (
    <TouchableOpacity
      style={[
        styles.box,
        { borderColor, backgroundColor, borderRadius },
        containerStyle,
      ]}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}
      {...rest}
    >
      <Animated.View
        pointerEvents="none"
        style={[
          styles.glow,
          {
            borderRadius,
            borderColor: activeBorderColor,
          },
          glowStyle,
        ]}
      />
      {check && (
        <>
          {isBox ? (
            <CheckIcon color={disabled ? paletts.GRAY300 : activeBorderColor} />
          ) : (
            <View
              style={[
                styles.circle,
                { borderRadius, backgroundColor: borderColor },
              ]}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    height: scale(16),
    borderRadius: scale(4),
    borderWidth: 1,
  },
  circle: {
    height: scale(8),
    aspectRatio: 1,
  },
  glow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderWidth: 6,
  },
});
