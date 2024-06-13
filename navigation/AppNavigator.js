import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from "../config/colors";
import routes from "./routes";

import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/CalendarScreen";
import ListScreen from "../screens/ListScreen";
import AccountScreen from "../screens/AccountScreen";
import TaskEditScreen from "../screens/TaskEditScreen";

import NewTaskButton from "./NewTaskButton";

const Tab = createBottomTabNavigator();




const AppNavigator = () => (
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
          tabBarIcon: ({ size, focused }) => <MaterialCommunityIcons name='home' size={size} color={focused ? colors.blue : colors.light } />
        }}
      />
      <Tab.Screen
        name='Calendar'
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ size, focused }) => <MaterialCommunityIcons name='calendar-month' size={size} color={focused ? colors.blue : colors.light }/>
        }}
      />
      <Tab.Screen
        name="TaskEdit"
        component={TaskEditScreen}
        options={({ navigation }) => ({
            tabBarButton: () => (
            <NewTaskButton
                onPress={() => navigation.navigate(routes.TASK_EDIT)}
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
        name='List'
        component={ListScreen}
        options={{
          tabBarIcon: ({ size, focused }) => <MaterialCommunityIcons name='clipboard-list' size={size} color={focused ? colors.blue : colors.light }/>
        }}
      />
      <Tab.Screen
        name='Account'
        component={AccountScreen}
        options={{
          tabBarIcon: ({ size, focused }) => <MaterialCommunityIcons name='account' size={size} color={focused ? colors.blue : colors.light }/>
        }}
      />
    </Tab.Navigator>
)




export default AppNavigator;
