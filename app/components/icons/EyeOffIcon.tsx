import React from 'react';
import Svg, { Path } from 'react-native-svg';

type EyeOffIconProps = {
  width?: number;
  height?: number;
  color?: string;
};

const EyeOffIcon: React.FC<EyeOffIconProps> = ({
  width = 20,
  height = 20,
  color = '#7A5AF8',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Path
        d="M12.1083 7.89166L7.89166 12.1083C7.35 11.5667 7.01666 10.825 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C10.825 7.01666 11.5667 7.35 12.1083 7.89166Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M14.85 4.80834C13.3917 3.70834 11.725 3.10834 10 3.10834C7.05834 3.10834 4.31667 4.84167 2.40834 7.84167C1.65834 9.01667 1.65834 10.9917 2.40834 12.1667C3.06667 13.2 3.83334 14.0917 4.66667 14.8083"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M7.01666 16.275C7.96666 16.675 8.975 16.8917 10 16.8917C12.9417 16.8917 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00834 17.5917 7.83334C17.3167 7.4 17.0167 6.99167 16.7083 6.60834"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M12.925 10.5833C12.7083 11.7583 11.75 12.7166 10.575 12.9333"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M7.89167 12.1083L1.66667 18.3333"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <Path
        d="M18.3333 1.66669L12.1083 7.89169"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default EyeOffIcon;
