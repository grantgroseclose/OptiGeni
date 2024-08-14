import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../navigation/AuthNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Screen from '../components/Screen';

import FormInputField from "../components/form/FormInputField";
import AppFormFC from "../components/form/AppForm";
import RegisterUserButtonFC from "../components/form/FormSubmitButton";

import { NewUser, validationSchema } from '../types//data/NewUser';
import { useRegisterService } from '../services/AuthService';






type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;


const RegisterScreen: React.FC<RegisterScreenProps> = ({navigation}) => {
    const RegisterService = useRegisterService();

    const RegisterUserForm = AppFormFC<NewUser>();
    const RegisterUserButton = RegisterUserButtonFC<NewUser>();

    const registerUserOnSubmit = async (data: NewUser) => {
        const res = await RegisterService.post(data);
        
        if (typeof res === 'object') {
            if ('error' in res && res.error !== "") {
                return Alert.alert('Error', res.error);
            }
            Alert.alert('Success!', 'Registration successful.', [
                { text: "Ok", onPress: () => navigation.navigate('Start') },
            ]);
        }
    };
    

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

