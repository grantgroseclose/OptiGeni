import { KeyboardTypeOptions } from "react-native";




type FormInputFieldProps = {
    name: string;
    error?: string;
    id?: string;
    icon?: React.ReactNode;
    keyboardType?: KeyboardTypeOptions | undefined;
    secureTextEntry?: boolean;
};


export default FormInputFieldProps;
