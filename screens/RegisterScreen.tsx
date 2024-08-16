import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../navigation/AuthNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Screen from '../components/Screen';
import RegisterForm from '../components/form/RegisterForm';




type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;


const RegisterScreen: React.FC<RegisterScreenProps> = ({navigation}) => {
    return (
        <Screen passedStyle={styles.container}>
            <View style={{width: '92.5%', alignSelf: 'center'}}>
                <RegisterForm />
            </View>
        </Screen>
    );
}




const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});
 

export default RegisterScreen;

