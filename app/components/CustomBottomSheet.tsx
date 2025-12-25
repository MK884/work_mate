// import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
// import React, { forwardRef } from 'react';
// import BottomSheet, {
//   BottomSheetBackdrop,
//   BottomSheetBackdropProps,
//   BottomSheetProps,
//   BottomSheetView,
// } from '@gorhom/bottom-sheet';
// import { BlurView } from '@react-native-community/blur';

// type Props = BottomSheetBackdropProps & {
//   onPress?: () => void;
// };

// const BlurBackdrop = ({ style, onPress }: Props) => {
//   const isBlurSupported = Platform.OS === 'ios' || Platform.Version >= '31';

//   return (
//     <Pressable style={[StyleSheet.absoluteFill, style]} onPress={onPress}>
//       {isBlurSupported ? (
//         <BlurView
//           style={StyleSheet.absoluteFill}
//           blurType="dark"
//           blurAmount={12}
//           reducedTransparencyFallbackColor="rgba(0,0,0,0.45)"
//         />
//       ) : (
//         <View
//           style={[
//             StyleSheet.absoluteFill,
//             { backgroundColor: 'rgba(0,0,0,0.45)' },
//           ]}
//         />
//       )}
//     </Pressable>
//   );
// };

// const renderBackdrop = React.useCallback(
//   (props: any) => (
//     <BottomSheetBackdrop {...props} disappearsOnIndex={1} appearsOnIndex={2} />
//   ),
//   [],
// );

// export type CustomBottomSheetRef = BottomSheet;

// export type CustomBottomSheetProps = BottomSheetProps & {
//   blurBackdrop?: boolean;
// };

// export const CustomBottomSheet = forwardRef<
//   CustomBottomSheetRef,
//   CustomBottomSheetProps
// >((props, ref) => {
//   const {
//     children,
//     backdropComponent,
//     blurBackdrop = true,
//     snapPoints,
//     ...rest
//   } = props;

//   const snapPointsMemo = React.useMemo(
//     () => snapPoints || ['50%', '100%'],
//     [snapPoints],
//   );

//   return (
//     <BottomSheet
//       ref={ref}
//       snapPoints={snapPointsMemo}
//       // index={-1}
//       backdropComponent={renderBackdrop}
//       {...rest}
//     >
//       {children}
//     </BottomSheet>
//   );
// });

// const styles = StyleSheet.create({});

import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetProps,
} from '@gorhom/bottom-sheet';
import React from 'react';
import { StyleSheet } from 'react-native';

export type CustomBottomSheetRef = BottomSheet;

export type CustomBottomSheetProps = BottomSheetProps & {
  blurBackdrop?: boolean;
};

export const CustomBottomSheet = React.forwardRef<
  CustomBottomSheetRef,
  CustomBottomSheetProps
>((props, ref) => {
  const { snapPoints, children, ...rest } = props;
  const renderBackdrop = React.useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  const snapPointsMemo = React.useMemo(
    () => snapPoints || ['50%', '70%'],
    [snapPoints],
  );
  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPointsMemo}
      enablePanDownToClose
      index={-1}
      backdropComponent={renderBackdrop}
      {...rest}
    >
      {children}
    </BottomSheet>
  );
});

export default CustomBottomSheet;

const styles = StyleSheet.create({});
