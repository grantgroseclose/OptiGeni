import React from "react";
import { useFormikContext, useField } from 'formik';

import FormInputFieldProps from "../../types/form/FormInputFieldProps";
import AppTextInput from "../AppTextInput";
import ErrorMessage from "./validation/ErrorMessage";




const FormInputField: React.FC<FormInputFieldProps> = ({
    icon,
    keyboardType,
    secureTextEntry,
    ...otherProps
}) => {
    const { setFieldTouched, handleChange, errors, touched } = useFormikContext();
    const [field, meta, helpers] = useField(otherProps);

    return (
        <>
            <AppTextInput
            onBlur={() => setFieldTouched(field.name)}
            onChangeText={handleChange(field.name)}
            keyboardType={keyboardType}
            placeholder={field.name}
            // editable={otherProps['editable']}
            placeholderTextColor={'gray'}
            icon={icon}
            secureTextEntry={secureTextEntry}
            {...otherProps}
            />
            { meta.touched && <ErrorMessage error={meta.error as string} visible={meta.touched as boolean} /> }
        </>
    );
}




export default FormInputField;

