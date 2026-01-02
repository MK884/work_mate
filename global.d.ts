declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "*.png"
declare module "*.jpg "
declare module "*.jpeg"

type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Profile: undefined;
  Messages:undefined;
  Notification: undefined;
  FinalScreen: undefined;
  MainTab: { screen?: keyof MainTabParamList } | undefined;
};

type MainTabParamList = {
  Home: undefined;
  Attendance: undefined;
  Task: undefined;
  Expense: undefined;
  Leave: undefined;
};
