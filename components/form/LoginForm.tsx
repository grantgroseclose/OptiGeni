import React from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import Toast from 'react-native-toast-message';

import FormInputField from "./FormInputField";
import createAppForm from "./AppForm";
import createFormSubmitButton from "./FormSubmitButton";

import { ExistingUser, existingUserSchema } from '../../types/data/ExistingUser';
import { useAuthStore } from '../../store/auth';




const LoginForm: React.FC = () => {
    const loginUser = useAuthStore((state) => state.login);

    const LoginUserForm = createAppForm<ExistingUser>();
    const LoginUserButton = createFormSubmitButton<ExistingUser>();

    const toastError = (err: string) => {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: err
        });
    }

    const toastSuccess = (username: string) => {
        Toast.show({
            type: 'success',
            text1: `Welcome`,
            text2: `Hi ${username}!`
        });
    }

    const loginUserOnSubmit = async (data: ExistingUser) => {
        const { username } = data;
        const res = await loginUser(data);

        if (typeof res === 'object' && 'error' in res) {
            toastError(res.error);
        } else {
            toastSuccess(username);
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

