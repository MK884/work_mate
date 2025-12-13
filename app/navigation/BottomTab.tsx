import { MyTabBar } from '@components/MyTab';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Attendance from '@screens/attendant/Attendance';
import Expense from '@screens/expense/Expense';
import Home from '@screens/home/Home';
import Leave from '@screens/leave/Leave';
import Task from '@screens/task/Task';
import React from 'react';


const BottomTab = () => {

  const Tab = createBottomTabNavigator<MainTabParamList>();
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{headerShown:false}} tabBar={prop => <MyTabBar {...prop}/>}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Attendance" component={Attendance} />
      <Tab.Screen name="Expense" component={Expense} />
      <Tab.Screen name="Leave" component={Leave} />
      <Tab.Screen name="Task" component={Task} />
    </Tab.Navigator>
  )
}

export default BottomTab