import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form";
import { TextInputProps } from "react-native";


type FormInputFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = UseControllerProps<TFieldValues, TName> & TextInputProps & {
    id?: string;
    icon?: React.ReactNode;
};



export default FormInputFieldProps;
