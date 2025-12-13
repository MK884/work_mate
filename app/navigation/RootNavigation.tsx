import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '@utils/navigation';
import Splash from '@screens/splash/Splash';
import BottomTab from './BottomTab';
import Messages from '@screens/messages/Messages';
import Notification from '@screens/notification/Notification';
import Profile from '@screens/profile/Profile';
import SignIn from '@screens/auth/SignIn';
import SignUp from '@screens/auth/SignUp';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown:false}}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Messages" component={Messages} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="MainTab" component={BottomTab} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default RootNavigation;
