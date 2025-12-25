import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BottomSheetModal, BottomSheetModalProps } from '@gorhom/bottom-sheet';

export type CustomBottomSheetModalRef = BottomSheetModal;

export type CustomBottomSheetModalProps = BottomSheetModalProps;

export const CustomBottomSheetModal = React.forwardRef<
  CustomBottomSheetModalRef,
  CustomBottomSheetModalProps
>((props, ref) => {
  const { snapPoints, children, ...rest } = props;

  const snapPointsMemo = React.useMemo(
    () => snapPoints || ['50%', '70%'],
    [snapPoints],
  );

  return (
    <BottomSheetModal ref={ref} snapPoints={snapPointsMemo} {...rest}>
      {children}
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({});
