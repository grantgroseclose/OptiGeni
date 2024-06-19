import React from 'react';
import { StyleSheet } from 'react-native';
import { RootTabParamList } from '../navigation/AppNavigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import colors from '../config/colors';
import Screen from '../components/Screen';
import AppText from '../components/AppText';




type AccountScreenProps = BottomTabScreenProps<RootTabParamList, 'Account'>;


const AccountScreen: React.FC<AccountScreenProps> = ({navigation}) => {
    return (
        <Screen passedStyle={styles.container}>
            <AppText passedStyle={{fontSize: 72}} text='ACCOUNT DETAILS'/>
        </Screen>
    );
}




const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});
 

export default AccountScreen;

