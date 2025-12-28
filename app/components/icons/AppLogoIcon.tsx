import React from 'react';
import Svg, {
  Defs,
  G,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from 'react-native-svg';

type AppLogoIconProps = {
  size?: number;
  backgroundColor?: string;
  accentColor?: string;
};

const AppLogoIcon = ({
  size = 60,
  backgroundColor = '#6938EF',
  accentColor = '#6938EF',
}: AppLogoIconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <Defs>
        <LinearGradient
          id="paint0_linear"
          x1="30"
          y1="2"
          x2="30"
          y2="59.9091"
        >
          <Stop stopColor="#A787FF" />
          <Stop offset="1" stopColor="#4F1ED8" />
        </LinearGradient>
      </Defs>

      <G>
        <Path
          d="M2 10C2 5.58172 5.58172 2 10 2H50C54.4183 2 58 5.58172 58 10V50C58 54.4183 54.4183 58 50 58H10C5.58172 58 2 54.4183 2 50V10Z"
          fill={backgroundColor}
        />

        <Path
          d="M10 2.5H50C54.1421 2.5 57.5 5.85786 57.5 10V50C57.5 54.1421 54.1421 57.5 50 57.5H10C5.85786 57.5 2.5 54.1421 2.5 50V10C2.5 5.85786 5.85786 2.5 10 2.5Z"
          stroke="url(#paint0_linear)"
        />

        <Rect x="18" y="20" width="25" height="20" fill="#FFFFFF" />

        <Path d="M35.5 30L38 40H33L35.5 30Z" fill={accentColor} />
        <Path d="M25.5 30L28 20H23L25.5 30Z" fill={accentColor} />
        <Path d="M35.5 30L38 20H33L35.5 30Z" fill={accentColor} />
        <Path d="M25.5 30L28 40H23L25.5 30Z" fill={accentColor} />
      </G>
    </Svg>
  );
};

export default AppLogoIcon;
