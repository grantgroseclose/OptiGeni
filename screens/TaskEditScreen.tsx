import React from "react";
import { StyleSheet } from "react-native";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RootTabParamList } from '../navigation/AppNavigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import Screen from "../components/Screen";
import useAddTask from "../hooks/useAddTask";
import FormInputField from "../components/forms/FormInputField";
import FormSubmitButton from "../components/forms/FormSubmitButton";

import { validationSchema, AddTaskFormSubmissionData } from "../types/AddTaskData";
import AppForm from "../components/forms/AppForm";




type TaskEditScreenProps = BottomTabScreenProps<RootTabParamList, 'TaskEdit'>;


const TaskEditScreen: React.FC<TaskEditScreenProps> = () => {
    const methods = useForm<AddTaskFormSubmissionData>({
        resolver: zodResolver(validationSchema)
    });

    // const addTask = useAddTask(() => {});
    const addTask: SubmitHandler<AddTaskFormSubmissionData> = (data: AddTaskFormSubmissionData) => console.log(data);

    return (
        <Screen passedStyle={styles.container}>
            <AppForm methods={methods}>
                <FormInputField
                    name='title'
                    control={methods.control}
                    icon='pencil'
                />
                <FormInputField 
                    name='deadline'
                    control={methods.control}
                    icon='alarm'
                    keyboardType="numeric"
                />
                <FormInputField 
                    name='priority'
                    control={methods.control}
                    icon='alert-circle-check-outline'
                    keyboardType="numeric"
                />
                <FormInputField 
                    name='executionTime'
                    control={methods.control}
                    icon='timer-sand'
                    keyboardType="numeric"
                />
                <FormSubmitButton
                    title='Submit'
                    onSubmit={addTask}
                />
            </AppForm>
        </Screen>
    );
}




const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  form_container: {
    padding: 15,
    width: '100%'
  }
});


export default TaskEditScreen;

