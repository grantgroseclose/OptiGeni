import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../navigation/AuthNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Screen from '../components/Screen';

import FormInputField from "../components/forms/FormInputField";
import AppFormFC from "../components/forms/AppForm";
import RegisterUserButtonFC from "../components/forms/FormSubmitButton";

import { NewUserData, validationSchema } from '../types/NewUserData';






type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;


const RegisterScreen: React.FC<RegisterScreenProps> = ({navigation}) => {
    const RegisterUserForm = AppFormFC<NewUserData>();
    const RegisterUserButton = RegisterUserButtonFC<NewUserData>();


    const registerUserOnSubmit = (data: NewUserData) => console.log('register functionality');
    

    return (
        <Screen passedStyle={styles.container}>
            <View style={{width: '92.5%', alignSelf: 'center'}}>
                <RegisterUserForm
                    initialValues={{
                        username: '',
                        password: '',
                        firstname: ''
                    }}
                    validationSchema={validationSchema}
                    style={{}}
                    onSubmit={registerUserOnSubmit}
                >
                    <FormInputField
                        name='username'
                        icon='account'
                    />
                    <FormInputField
                        name='password'
                        icon='lock'
                        secureTextEntry
                    />
                    <FormInputField
                        name='firstname'
                        icon='contacts'
                    />
                    <RegisterUserButton
                        title='Submit'
                    />
                </RegisterUserForm>
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

