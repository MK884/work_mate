import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CheckIcon = ({
  width = 10,
  height = 8,
  color = '#7A5AF8',
  strokeWidth = 1.6666,
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 10 8"
      fill="none"
    >
      <Path
        d="M8.83331 0.833298L3.33331 6.3333L0.833313 3.8333"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CheckIcon;
