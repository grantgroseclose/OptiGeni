import React from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import Toast from 'react-native-toast-message';

import FormInputField from "./FormInputField";
import createAppForm from "./AppForm";
import createFormSubmitButton from "./FormSubmitButton";

import { useRegisterService } from '../../services/AuthService';
import { NewUser, newUserSchema } from '../../types/data/NewUser';

import { RootStackParamList } from '../../navigation/AuthNavigator';




type StartNavigatorProp = NavigationProp<RootStackParamList, 'Start'>;


const RegisterForm: React.FC = () => {
    const navigation = useNavigation<StartNavigatorProp>();
    const RegisterService = useRegisterService();

    const RegisterUserForm = createAppForm<NewUser>();
    const RegisterUserButton = createFormSubmitButton<NewUser>();

    const toastError = (err: string) => {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: err
        });
    }

    const toastSuccess = () => {
        Toast.show({
            type: 'success',
            text1: `Success`,
            text2: `Registration complete!`,
            onHide: () => navigation.navigate('Start')
        });
    }

    const registerUserOnSubmit = async (data: NewUser) => {
        const res = await RegisterService.post(data);

        if (typeof res === 'object' && 'error' in res) {
            toastError(res.error);
        } else {
            toastSuccess();
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

