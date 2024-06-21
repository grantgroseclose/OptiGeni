import React, { ReactNode } from "react";
import { View } from 'react-native';
import { FormProvider, UseFormReturn } from "react-hook-form";
import { AddTaskFormSubmissionData } from "../../types/AddTaskData";




type AppFormProps = {
    methods: UseFormReturn<AddTaskFormSubmissionData>;
    children: ReactNode;
};

const AppForm: React.FC<AppFormProps> = ({methods, children}) => {
    return (
        <FormProvider {...methods}>
            <View style={{width: '92.5%', alignSelf: 'center'}}>
                {children}
            </View>
        </FormProvider>
    );
}


export default AppForm;
