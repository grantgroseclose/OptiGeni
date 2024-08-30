import './gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import Toast from 'react-native-toast-message'

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import AppNavigator from './navigation/AppNavigator';
import AuthNavigator from './navigation/AuthNavigator';

import { useAuthStore } from './store/auth';
import AppDrawer from './components/AppDrawer';
import toastConfig from './config/toast';




const queryClient = new QueryClient();


export default function App() {
	const isAuth = useAuthStore((state) => state.isAuth);

	const [fontsLoaded] = useFonts({
		'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
		'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
		'Inter-ExtraBold': require('./assets/fonts/Inter-ExtraBold.ttf'),
		'Inter-ExtraLight': require('./assets/fonts/Inter-ExtraLight.ttf'),
		'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
		'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
		'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
		'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
		'Inter-Thin': require('./assets/fonts/Inter-Thin.ttf'),
	});

	if (!fontsLoaded) {
		return null;
	}


	return (
		<QueryClientProvider client={queryClient}>
			<NavigationContainer>
				{ isAuth ? 
					<AppDrawer>
						<AppNavigator />
					</AppDrawer> : 
					<AuthNavigator /> 
				}
			</NavigationContainer>
			<Toast config={toastConfig}/>
		</QueryClientProvider>
	);
}

