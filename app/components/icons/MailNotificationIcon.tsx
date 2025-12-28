import React from "react";
import Svg, { Path } from "react-native-svg";

interface Props {
  size?: number;
  color?: string;
  notificationColor?: string;
}

const MailNotificationIcon: React.FC<Props> = ({
  size = 48,
  color = "#FEFEFE",
  notificationColor = "#F95555",
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Notification Dot Background */}
      <Path
        d="M39 16C41.7614 16 44 13.7614 44 11C44 8.23858 41.7614 6 39 6C36.2386 6 34 8.23858 34 11C34 13.7614 36.2386 16 39 16Z"
        fill={color}
      />
      <Path
        d="M39 16C41.7614 16 44 13.7614 44 11C44 8.23858 41.7614 6 39 6C36.2386 6 34 8.23858 34 11C34 13.7614 36.2386 16 39 16Z"
        fill={notificationColor}
      />

      {/* Mail body */}
      <Path
        d="M41.44 18.6199C40.04 19.0599 38.5 19.1399 36.9 18.7399C34.22 18.0399 32.04 15.8999 31.3 13.2199C30.94 11.9199 30.92 10.6399 31.14 9.47994C31.4 8.19994 30.5 6.99994 29.22 6.99994H14C8 6.99994 4 9.99994 4 16.9999V30.9999C4 37.9999 8 40.9999 14 40.9999H34C40 40.9999 44 37.9999 44 30.9999V20.5199C44 19.1999 42.72 18.1999 41.44 18.6199ZM31.04 22.2999L28.68 24.1799C27.36 25.2399 25.68 25.7599 24 25.7599C22.32 25.7599 20.62 25.2399 19.32 24.1799L13.06 19.1799C12.42 18.6599 12.32 17.6999 12.82 17.0599C13.34 16.4199 14.28 16.2999 14.92 16.8199L21.18 21.8199C22.7 23.0399 25.28 23.0399 26.8 21.8199L29.16 19.9399C29.8 19.4199 30.76 19.5199 31.26 20.1799C31.78 20.8199 31.68 21.7799 31.04 22.2999Z"
        fill={color}
      />
    </Svg>
  );
};

export default MailNotificationIcon;
