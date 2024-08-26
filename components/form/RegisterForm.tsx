import React from 'react';
import { Alert } from 'react-native';

import FormInputField from "./FormInputField";
import createAppForm from "./AppForm";
import createFormSubmitButton from "./FormSubmitButton";

import { useRegisterService } from '../../services/AuthService';
import { NewUser, newUserSchema } from '../../types/data/NewUser';

import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AuthNavigator';
import { toFormikValidationSchema } from 'zod-formik-adapter';




type StartNavigatorProp = NavigationProp<RootStackParamList, 'Start'>;


const RegisterForm: React.FC = () => {
    const navigation = useNavigation<StartNavigatorProp>();
    const RegisterService = useRegisterService();

    const RegisterUserForm = createAppForm<NewUser>();
    const RegisterUserButton = createFormSubmitButton<NewUser>();

    const registerUserOnSubmit = async (data: NewUser) => {
        const res = await RegisterService.post(data);

        if (typeof res === 'object' && 'error' in res) {
            Alert.alert('Error', res.error);
        } else {
            Alert.alert('Success!', 'Registration successful.', [
                { text: "Ok", onPress: () => navigation.navigate('Start') },
            ]);
        }
    };
    

    return (
        <RegisterUserForm
            initialValues={{
                username: '',
                password: '',
                firstname: ''
            }}
            validationSchema={toFormikValidationSchema(newUserSchema)}
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
    );
}
 



export default RegisterForm;

