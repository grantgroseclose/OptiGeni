import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from "../config/colors";
import routes from "./routes";

import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/CalendarScreen";
// import ListScreen from "../screens/ListScreen";
// import AccountScreen from "../screens/AccountScreen";
import AddTaskScreen from "../screens/AddTaskScreen";

import NewTaskButton from "./NewTaskButton";




export type RootTabParamList = {
  Home: undefined;
  Calendar: undefined;
  AddTask: undefined;
  // List: undefined;
  // Account: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

type AppNavigatorProps = {

};


const AppNavigator: React.FC<AppNavigatorProps> = () => (
    <Tab.Navigator screenOptions={{ 
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: colors.primary,
          borderTopColor: colors.medium
        },
        tabBarActiveTintColor: colors.blue
      }}>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size, focused }) => <MaterialCommunityIcons name='home-outline' size={size} color={focused ? colors.blue : colors.light } />
        }}
      />
      <Tab.Screen
        name="AddTask"
        component={AddTaskScreen}
        options={({ navigation }) => ({
            tabBarButton: () => (
            <NewTaskButton
                onPress={() => navigation.navigate(routes.TASK_ADD)}
            />
            ),
            tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
                name="plus-circle"
                color={color}
                size={size}
            />
            ),
        })}
      />
      <Tab.Screen
        name='Calendar'
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ size, focused }) => <MaterialCommunityIcons name='calendar-month-outline' size={size} color={focused ? colors.blue : colors.light }/>
        }}
      />
      {/* <Tab.Screen
        name='List'
        component={ListScreen}
        options={{
          tabBarIcon: ({ size, focused }) => <MaterialCommunityIcons name='clipboard-list' size={size} color={focused ? colors.blue : colors.light }/>
        }}
      /> */}
      {/* <Tab.Screen
        name='Account'
        component={AccountScreen}
        options={{
          tabBarIcon: ({ size, focused }) => <MaterialCommunityIcons name='account-outline' size={size} color={focused ? colors.blue : colors.light }/>
        }}
      /> */}
    </Tab.Navigator>
)




export default AppNavigator;
