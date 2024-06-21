import React from "react";
import { useFormContext, SubmitHandler } from 'react-hook-form';
import { AddTaskFormSubmissionData } from "../../types/AddTaskData";
import AppButton from "../AppButton";




type FormSubmitButtonProps = {
    title: string;
    onSubmit: SubmitHandler<AddTaskFormSubmissionData>;
};


const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({ title, onSubmit }) => {
    const { handleSubmit } = useFormContext<AddTaskFormSubmissionData>();

    return <AppButton title={title} onPress={handleSubmit(onSubmit)} />;
}




export default FormSubmitButton;
