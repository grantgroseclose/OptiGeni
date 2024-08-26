import React from 'react';
import { Alert } from 'react-native';

import FormInputField from "./FormInputField";
import createAppForm from "./AppForm";
import createFormSubmitButton from "./FormSubmitButton";

import { ExistingUser, existingUserSchema } from '../../types/data/ExistingUser';
import { useAuthStore } from '../../store/auth';
import { toFormikValidationSchema } from 'zod-formik-adapter';




const LoginForm: React.FC = () => {
    const loginUser = useAuthStore((state) => state.login);

    const LoginUserForm = createAppForm<ExistingUser>();
    const LoginUserButton = createFormSubmitButton<ExistingUser>();

    const loginUserOnSubmit = async (data: ExistingUser) => {
        const res = await loginUser(data);

        if (typeof res === 'object' && 'error' in res) {
            Alert.alert('Error', res.error);
        }
    }
    

    return (
        <LoginUserForm
            initialValues={{
                username: '',
                password: ''
            }}
            validationSchema={toFormikValidationSchema(existingUserSchema)}
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
    );
}


 

export default LoginForm;

