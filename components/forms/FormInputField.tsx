import React from "react";
import { useController, FieldValues, FieldPath } from 'react-hook-form';
import FormInputFieldProps from "../../types/FormInputFieldProps";
import AppTextInput from "../AppTextInput";




// Define the component using JSX with generics
const FormInputFieldElement = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
    name,
    rules,
    control,
    icon,
    keyboardType,
    ...rest
}: FormInputFieldProps<TFieldValues, TName>) => {
    const { field } = useController<TFieldValues, TName>({
        name,
        control,
        rules
    });

    return (
        <AppTextInput
            {...field}
            value={field.value}
            icon={icon}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            placeholder={name}
            keyboardType={keyboardType}
            {...rest}
        />
    );
};

// Define a higher-order component that wraps FormInputFieldElement and maintains generics
const FormInputField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>() => {
    const WrappedFormInputField: React.FC<FormInputFieldProps<TFieldValues, TName>> = (props) => <FormInputFieldElement {...props} />;
    return WrappedFormInputField;
};




export default FormInputField;

