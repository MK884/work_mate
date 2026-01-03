import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

const ElapsedTimeIcon: React.FC<Props> = ({
  size = 14,
  color = "#F79009",
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path
        d="M6.66667 0C2.99333 0 0 2.99333 0 6.66667C0 10.34 2.99333 13.3333 6.66667 13.3333C10.34 13.3333 13.3333 10.34 13.3333 6.66667C13.3333 2.99333 10.34 0 6.66667 0ZM9.56667 9.04667C9.47333 9.20667 9.30667 9.29333 9.13333 9.29333C9.04667 9.29333 8.96 9.27333 8.88 9.22L6.81333 7.98667C6.3 7.68 5.92 7.00667 5.92 6.41333V3.68C5.92 3.40667 6.14667 3.18 6.42 3.18C6.69333 3.18 6.92 3.40667 6.92 3.68V6.41333C6.92 6.65333 7.12 7.00667 7.32667 7.12667L9.39333 8.36C9.63333 8.5 9.71333 8.80667 9.56667 9.04667Z"
        fill={color}
      />
    </Svg>
  );
};

export default ElapsedTimeIcon;
