import React from "react";
import { FormikValues, useFormikContext } from "formik";

import AppButton from "../AppButton";



type FormSubmitButtonProps =  {
    title: string;
};


const FormSubmitButtonElement = <TFieldValues extends FormikValues>({
    title
}: FormSubmitButtonProps) => {
    const { handleSubmit } = useFormikContext<TFieldValues>();

    return <AppButton title={title} onPress={handleSubmit} />;
};


const FormSubmitButton = <TFieldValues extends FormikValues>() => {
    const WrappedAppFormElement: React.FC<FormSubmitButtonProps> = (props) => <FormSubmitButtonElement {...props} />;
    return WrappedAppFormElement;
};







export default FormSubmitButton;
