import React from 'react';
import Svg, { Path } from 'react-native-svg';

type ScanIconProps = {
  width?: number;
  height?: number;
  primaryColor?: string;
  secondaryColor?: string;
};

const ScanIcon: React.FC<ScanIconProps> = ({
  width = 20,
  height = 20,
  primaryColor = '#9B8AFB',
  secondaryColor = '#7A5AF8',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      {/* Center icon */}
      <Path
        d="M10 12.4C9.24167 12.4 8.625 11.7833 8.625 11.025V8.9667C8.625 8.20836 9.24167 7.59167 10 7.59167C10.7583 7.59167 11.375 8.20836 11.375 8.9667V11.025C11.375 11.7833 10.7583 12.4 10 12.4Z"
        stroke={primaryColor}
        strokeWidth={1.5}
        strokeLinecap="round"
      />

      <Path
        d="M14.15 11.225C13.9833 13.375 12.1833 15.0583 10 15.0583C7.70001 15.0583 5.83334 13.1917 5.83334 10.8917V9.10832C5.83334 6.80832 7.70001 4.94165 10 4.94165C12.1583 4.94165 13.9333 6.58331 14.1417 8.68331"
        stroke={primaryColor}
        strokeWidth={1.5}
        strokeLinecap="round"
      />

      {/* Corners */}
      <Path
        d="M12.5 1.66669H14.1667C16.6667 1.66669 18.3333 3.33335 18.3333 5.83335V7.50002"
        stroke={secondaryColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M1.66666 7.50002V5.83335C1.66666 3.33335 3.33332 1.66669 5.83332 1.66669H7.49999"
        stroke={secondaryColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M12.5 18.3333H14.1667C16.6667 18.3333 18.3333 16.6667 18.3333 14.1667V12.5"
        stroke={secondaryColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M1.66666 12.5V14.1667C1.66666 16.6667 3.33332 18.3333 5.83332 18.3333H7.49999"
        stroke={secondaryColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ScanIcon;
