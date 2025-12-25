import { StyleSheet, Text, TextStyle, View } from 'react-native';
import React from 'react';
import { paletts } from '@styles/paletts';
import { scale } from '@utils/scale';

interface Props {
  label?: string;
  color?: string;
  labelStyle?: TextStyle;
}

const Divider = ({ label, color = paletts.GRAY100, labelStyle }: Props) => {
  const backgroundColor = color;
  return (
    <View style={[styles.container]}>
      <View style={[styles.divider, { backgroundColor }]} />
      {label && (
        <View>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
        </View>
      )}
      <View style={[styles.divider, { backgroundColor }]} />
    </View>
  );
};

export default Divider;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: paletts.GRAY100,
    flex: 1,
  },
  label: {
    color: paletts.GRAY400,
    textAlign: 'center',
    marginHorizontal: scale(8),
  },
});
