import React from "react";
import { useController, FieldValues, FieldPath } from 'react-hook-form';
import InputProps from "../../types/InputProps";
import FormInputFieldProps from "../../types/FormInputFieldProps";
import AppTextInput from "../AppTextInput";





const FormInputField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({
  name,
  rules,
  control,
  icon,
  keyboardType,
  ...rest
}: FormInputFieldProps<TFieldValues, TName> & InputProps) => {
    const { field, fieldState, formState } = useController({
        name,
        control,
        rules: { required: true }
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
        />
    );
}






export default FormInputField;

