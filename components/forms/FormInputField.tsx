import React from "react";
import { useController, FieldValues, FieldPath, useFormContext } from 'react-hook-form';
import FormInputFieldProps from "../../types/FormInputFieldProps";
import AppTextInput from "../AppTextInput";
import ErrorMessage from "./validation/ErrorMessage";




const FormInputFieldElement = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
    name,
    rules,
    icon,
    keyboardType,
    ...rest
}: FormInputFieldProps<TFieldValues, TName>) => {
    const { control } = useFormContext<TFieldValues>();
    const { field, fieldState: { error } } = useController<TFieldValues, TName>({
        name,
        control,
        rules
    });

    console.log(field.name + ': ' + error?.message as string);

    return (
        <>
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
            <ErrorMessage error={error?.message as string}/>
        </>
    );
};


const FormInputField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>() => {
    const WrappedFormInputField: React.FC<FormInputFieldProps<TFieldValues, TName>> = (props) => <FormInputFieldElement {...props} />;
    return WrappedFormInputField;
};




export default FormInputField;

