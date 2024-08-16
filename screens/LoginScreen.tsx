import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../navigation/AuthNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Screen from '../components/Screen';
import LoginForm from '../components/form/LoginForm';




type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;


const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
    return (
        <Screen passedStyle={styles.container}>
            <View style={{width: '92.5%', alignSelf: 'center'}}>
                <LoginForm />
            </View>
        </Screen>
    );
}




const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});
 

export default LoginScreen;

