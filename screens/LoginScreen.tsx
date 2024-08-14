import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../navigation/AuthNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Screen from '../components/Screen';

import FormInputField from "../components/form/FormInputField";
import AppFormFC from "../components/form/AppForm";
import LoginUserButtonFC from "../components/form/FormSubmitButton";

import { ExistingUser, validationSchema } from '../types/data/ExistingUser';
import { useAuthStore } from '../store/auth';




type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;


const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
    const loginUser = useAuthStore((state) => state.login);

    const LoginUserForm = AppFormFC<ExistingUser>();
    const LoginUserButton = LoginUserButtonFC<ExistingUser>();

    const loginUserOnSubmit = async (data: ExistingUser) => {
        const res = await loginUser(data);

        if (typeof res === 'object' && 'error' in res) {
            Alert.alert('Error', res.error);
        }
    }
    

    return (
        <Screen passedStyle={styles.container}>
            <View style={{width: '92.5%', alignSelf: 'center'}}>
                <LoginUserForm
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    validationSchema={validationSchema}
                    style={{}}
                    onSubmit={loginUserOnSubmit}
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
                    <LoginUserButton
                        title='Submit'
                    />
                </LoginUserForm>
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

