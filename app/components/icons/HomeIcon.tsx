import Svg, { Path } from 'react-native-svg';

export const HomeIcon = ({ color = "#FEFEFE", width = 24, height = 24, isActive = false }) => {
  return isActive ? (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.04 6.82L14.28 2.79C12.71 1.69 10.3 1.75 8.79 2.92L3.78 6.83C2.78 7.61 1.99 9.21 1.99 10.47V17.37C1.99 19.92 4.06 22 6.61 22H17.39C19.94 22 22.01 19.93 22.01 17.38V10.6C22.01 9.25 21.14 7.59 20.04 6.82ZM12.75 18C12.75 18.41 12.41 18.75 12 18.75C11.59 18.75 11.25 18.41 11.25 18V15C11.25 14.59 11.59 14.25 12 14.25C12.41 14.25 12.75 14.59 12.75 15V18Z"
        fill={color}
      />
    </Svg>
  )  :(
    <Svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none"
    >
      <Path
        d="M9.01976 2.84004L3.62976 7.04004C2.72976 7.74004 1.99976 9.23004 1.99976 10.36V17.77C1.99976 20.09 3.88976 21.99 6.20976 21.99H17.7898C20.1098 21.99 21.9998 20.09 21.9998 17.78V10.5C21.9998 9.29004 21.1898 7.74004 20.1998 7.05004L14.0198 2.72004C12.6198 1.74004 10.3698 1.79004 9.01976 2.84004Z"
        stroke={color}
        strokeWidth={1.38462}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 17.9901V14.9901"
        stroke={color}
        strokeWidth={1.38462}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

