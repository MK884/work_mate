import React from 'react';
import Svg, { Path } from 'react-native-svg';

type MailIconProps = {
  width?: number;
  height?: number;
  color?: string;
  fill?:string;
};

const MailIcon: React.FC<MailIconProps> = ({
  width = 20,
  height = 20,
  color = '#9B8AFB',
  fill='none'
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
    >
      <Path
        d="M14.1667 17.0834H5.83332C3.33332 17.0834 1.66666 15.8334 1.66666 12.9167V7.08335C1.66666 4.16669 3.33332 2.91669 5.83332 2.91669H14.1667C16.6667 2.91669 18.3333 4.16669 18.3333 7.08335V12.9167C18.3333 15.8334 16.6667 17.0834 14.1667 17.0834Z"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.1667 7.5L11.5583 9.58333C10.7 10.2667 9.29167 10.2667 8.43334 9.58333L5.83334 7.5"
        stroke={color}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default MailIcon;
