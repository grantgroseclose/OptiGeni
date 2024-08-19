import React from 'react';
import { StyleSheet } from 'react-native';
import { RootTabParamList } from '../navigation/AppNavigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import Screen from '../components/Screen';
import AppButton from '../components/AppButton';
import { useAuthStore } from '../store/auth';
import { useQueryClient } from '@tanstack/react-query';




type AccountScreenProps = BottomTabScreenProps<RootTabParamList, 'Account'>;


const AccountScreen: React.FC<AccountScreenProps> = ({navigation}) => {
    const queryClient = useQueryClient();
    const logoutUser = useAuthStore((state) => state.logout);

    const logoutUserOnSubmit = () => {
        queryClient.clear();
        logoutUser();
    }

    return (
        <Screen passedStyle={styles.container}>
            <AppButton title={'Logout'} onPress={logoutUserOnSubmit} />
        </Screen>
    );
}




const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});
 

export default AccountScreen;

