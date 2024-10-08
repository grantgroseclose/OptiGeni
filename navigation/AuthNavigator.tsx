import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import colors from "../config/colors";

import StartScreen from "../screens/StartScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";



export type RootStackParamList = {
    Start: undefined;
    Login: undefined;
    Register: undefined;
};
  
const Stack = createNativeStackNavigator<RootStackParamList>();

type AuthNavigatorProps = {

};




const AuthNavigator: React.FC<AuthNavigatorProps> = () => (
    <Stack.Navigator screenOptions={{ headerTransparent: true, title: '', headerTintColor: colors.light }}>
        <Stack.Screen name='Start' component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
    </Stack.Navigator>
)


export default AuthNavigator;