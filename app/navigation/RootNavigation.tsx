import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '@screens/auth/SignIn';
import SignUp from '@screens/auth/SignUp';
import Messages from '@screens/messages/Messages';
import Notification from '@screens/notification/Notification';
import Profile from '@screens/profile/Profile';
import FinalScreen from '@screens/splash/FinalScreen';
import Splash from '@screens/splash/Splash';
import { navigationRef } from '@utils/navigation';
import React from 'react';
import BottomTab from './BottomTab';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Messages" component={Messages} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{
                presentation: 'transparentModal',
                animation: 'slide_from_bottom',
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                presentation: 'modal',
              }}
            />
            <Stack.Screen name="FinalScreen" component={FinalScreen} />
            <Stack.Screen name="MainTab" component={BottomTab} />
          </Stack.Navigator>
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default RootNavigation;
