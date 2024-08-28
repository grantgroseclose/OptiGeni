import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors, { material_colors } from "../config/colors";
import routes from "./routes";

import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/CalendarScreen";
import AccountScreen from "../screens/AccountScreen";
import AddTaskScreen from "../screens/AddTaskScreen";

import NewTaskButton from "./NewTaskButton";
import BoardScreen from "../screens/BoardScreen";




export type RootTabParamList = {
	Home: undefined;
	Calendar: undefined;
	AddTask: undefined;
	Board: undefined;
	Account: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

type AppNavigatorProps = {

};


const AppNavigator: React.FC<AppNavigatorProps> = () => (
    <Tab.Navigator screenOptions={{ 
        headerShown: false,
        tabBarStyle: { 
			backgroundColor: colors.primary,
			borderTopWidth: 0,
			shadowColor: material_colors.grey.darken4,
			shadowRadius: 25,
			shadowOpacity: 0.7
        },
        tabBarActiveTintColor: material_colors.cyan.accent3
    }}>
		<Tab.Screen
			name='Home'
			component={HomeScreen}
			options={{
				tabBarIcon: ({ size, focused }) => <MaterialCommunityIcons name='home-outline' size={size} color={focused ? material_colors.cyan.accent3 : material_colors.grey.darken1 } />
			}}
		/>
		<Tab.Screen
			name='Calendar'
			component={CalendarScreen}
			options={{
				tabBarIcon: ({ size, focused }) => <MaterialCommunityIcons name='calendar-month-outline' size={size} color={focused ? material_colors.cyan.accent3 : material_colors.grey.darken1 }/>
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
			name='Board'
			component={BoardScreen}
			options={{
				tabBarIcon: ({ size, focused }) => <MaterialCommunityIcons name='table-large' size={size} color={focused ? material_colors.cyan.accent3 : material_colors.grey.darken1 } />
			}}
		/>
		<Tab.Screen
			name='Account'
			component={AccountScreen}
			options={{
				tabBarIcon: ({ size, focused }) => <MaterialCommunityIcons name='account-outline' size={size} color={focused ? material_colors.cyan.accent3 : material_colors.grey.darken1 }/>
			}}
		/>
    </Tab.Navigator>
)




export default AppNavigator;
