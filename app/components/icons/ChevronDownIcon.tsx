import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ChevronDownIconProps {
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
}

const ChevronDownIcon = ({
  width = 18,
  height = 9,
  color = '#7A5AF8',
  strokeWidth = 1.5,
}: ChevronDownIconProps) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 18 9"
      fill="none"
    >
      <Path
        d="M16.59 0.75L10.07 7.27C9.3 8.04 8.04 8.04 7.27 7.27L0.75 0.75"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ChevronDownIcon;
