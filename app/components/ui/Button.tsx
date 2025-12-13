import { paletts } from '@styles/paletts';
import React from 'react';
import {
  Pressable,
  PressableProps,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Platform,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'primary' | 'secondary' | 'primaryGhost' | 'secondaryGhost';

export interface RNButtonIconProps extends PressableProps {
  /** Text shown if no children are provided */
  title?: string;
  /** Optional start icon component (React element) */
  startIcon?: React.ReactNode;
  /** Optional end icon component (React element) */
  endIcon?: React.ReactNode;
  /** When true, shows a loading spinner and disables presses */
  loading?: boolean;
  /** Short-hand disabled; PressableProps.disabled also honored */
  disabled?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  /** Add extra spacing between icon and text */
  iconSpacing?: number;
  /** Styles applied to the outer Pressable container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Styles applied to inner content row */
  contentStyle?: StyleProp<ViewStyle>;
  /** Text style override */
  textStyle?: StyleProp<TextStyle>;
  /** Icon wrapper style override */
  iconStyle?: StyleProp<ViewStyle>;
  children?: React.ReactElement
}

const SIZE_STYLES: Record<ButtonSize, { paddingVertical: number; paddingHorizontal: number; fontSize: number; iconSize: number }> = {
  sm: { paddingVertical: 6, paddingHorizontal: 10, fontSize: 13, iconSize: 16 },
  md: { paddingVertical: 10, paddingHorizontal: 14, fontSize: 15, iconSize: 20 },
  lg: { paddingVertical: 14, paddingHorizontal: 18, fontSize: 17, iconSize: 24 },
};

const VARIANT_STYLES: Record<ButtonVariant, { backgroundColor: string; textColor: string; borderWidth?: number; borderColor?: string }> = {
  primary: { backgroundColor: paletts.PURPLE600, textColor: '#ffffff' },
  secondary: { backgroundColor: paletts.RED600,  textColor: '#ffffff' },
  primaryGhost: { backgroundColor: 'transparent', textColor: '#111827', borderWidth: 1, borderColor: paletts.PURPLE600 },
  secondaryGhost: { backgroundColor: 'transparent', textColor: '#111827', borderWidth: 1, borderColor: paletts.RED600 },
};

export function Button(props: RNButtonIconProps) {
  const {
    title,
    children,
    startIcon,
    endIcon,
    loading,
    disabled,
    size = 'md',
    variant = 'primary',
    iconSpacing = 8,
    containerStyle,
    contentStyle,
    textStyle,
    iconStyle,
    onPress,
    accessibilityLabel,
    ...pressableProps
  } = props;

  const isDisabled = !!disabled || !!loading;
  const sizeStyle = SIZE_STYLES[size];
  const variantStyle = VARIANT_STYLES[variant];


  const combinedContainerStyle: ViewStyle = {
    backgroundColor: variantStyle.backgroundColor,
    paddingVertical: sizeStyle.paddingVertical,
    paddingHorizontal: sizeStyle.paddingHorizontal,
    borderWidth: variantStyle?.borderWidth,
    borderColor: variantStyle?.borderColor,
    borderRadius: 16,
    opacity: isDisabled ? 0.6 : 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      accessibilityLabel={accessibilityLabel ?? title}
      onPress={isDisabled ? undefined : onPress}
      android_ripple={Platform.OS === 'android' && !isDisabled ? { color: 'rgba(0,0,0,0.08)' } : undefined}
      style={({ pressed }) => [
        combinedContainerStyle,
        pressed && !isDisabled ? { opacity: 0.85 } : null,
        containerStyle,
      ]}
      disabled={isDisabled}
      {...pressableProps}
    >
      {/* Loading state: show spinner and keep space for icons/text */}
      {loading ? (
        <ActivityIndicator
          size={size === 'sm' ? 'small' : 'small'}
          color={variantStyle.textColor}
        />
      ) : (
        <View style={[styles.contentRow, contentStyle]}>
          {startIcon ? <View style={[{ marginRight: iconSpacing, alignItems: 'center', justifyContent: 'center' }, iconStyle]}>{startIcon}</View> : null}

          {children ? (
            <Text numberOfLines={1} style={[{ color: variantStyle.textColor, fontSize: sizeStyle.fontSize }, textStyle]}>
              {children}
            </Text>
          ) : (
            title ? (
              <Text numberOfLines={1} style={[{ color: variantStyle.textColor, fontSize: sizeStyle.fontSize }, textStyle]}>
                {title}
              </Text>
            ) : null
          )}

          {endIcon ? <View style={[{ marginLeft: iconSpacing, alignItems: 'center', justifyContent: 'center' }, iconStyle]}>{endIcon}</View> : null}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
