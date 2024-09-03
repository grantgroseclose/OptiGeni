import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors, { material_colors } from "../config/colors";
import routes from "./routes";

import HomeScreen from "../screens/HomeScreen";
import BoardScreen from "../screens/BoardScreen";
import AddTaskScreen from "../screens/AddTaskScreen";

import NewTaskButton from "./NewTaskButton";
import { screenHeight } from "../config/dimensions";




export type RootTabParamList = {
	Home: undefined;
	AddTask: undefined;
	Board: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

type AppNavigatorProps = {

};


const AppNavigator: React.FC<AppNavigatorProps> = () => (
    <Tab.Navigator screenOptions={{ 
        headerShown: false,
        tabBarStyle: { 
			backgroundColor: colors.dark,
			borderTopWidth: 0,
			// shadowColor: material_colors.purple.accent3,
			// shadowRadius: 25,
			// shadowOpacity: .5
			shadowColor: material_colors.shades.black,
			shadowRadius: 10,
			shadowOpacity: 1
        },
        tabBarActiveTintColor: material_colors.purple.accent4
    }}>
		<Tab.Screen
			name='Home'
			component={HomeScreen}
			options={{
				tabBarIcon: ({ size, focused }) => <MaterialCommunityIcons name='home-outline' size={size} color={focused ? material_colors.purple.accent4 : material_colors.grey.darken1 } />
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
				tabBarIcon: ({ size, focused }) => <MaterialCommunityIcons name='table' size={size} color={focused ? material_colors.purple.accent4 : material_colors.grey.darken1 }/>
			}}
		/>
    </Tab.Navigator>
)




export default AppNavigator;
