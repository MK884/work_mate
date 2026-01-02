import * as React from "react";
import Svg, { Path } from "react-native-svg";

type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

const ChatBubbleIcon: React.FC<IconProps> = ({
  width = 17,
  height = 16,
  color = "#6E62FF",
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 17 16"
      fill="none"
    >
      <Path
        d="M12.5 0H4.16667C1.66667 0 0 1.66667 0 4.16667V9.16667C0 11.6667 1.66667 13.3333 4.16667 13.3333H7.5L11.2083 15.8C11.7583 16.1667 12.5 15.775 12.5 15.1083V13.3333C15 13.3333 16.6667 11.6667 16.6667 9.16667V4.16667C16.6667 1.66667 15 0 12.5 0ZM11.25 7.35H5.41667C5.075 7.35 4.79167 7.06667 4.79167 6.725C4.79167 6.38333 5.075 6.1 5.41667 6.1H11.25C11.5917 6.1 11.875 6.38333 11.875 6.725C11.875 7.06667 11.5917 7.35 11.25 7.35Z"
        fill={color}
      />
    </Svg>
  );
};

export default ChatBubbleIcon;
