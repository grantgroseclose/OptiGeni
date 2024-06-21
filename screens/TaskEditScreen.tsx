import React from "react";
import { Alert, StyleSheet } from "react-native";
import { FieldPath, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RootTabParamList } from '../navigation/AppNavigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import Screen from "../components/Screen";
import useAddTask from "../hooks/mutations/useAddTask";
import FormInputField from "../components/forms/FormInputField";
import FormSubmitButton from "../components/forms/FormSubmitButton";

import { validationSchema, AddTaskFormSubmissionData } from "../types/AddTaskData";
import AppForm from "../components/forms/AppForm";




type TaskEditScreenProps = BottomTabScreenProps<RootTabParamList, 'TaskEdit'>;


const TaskEditScreen: React.FC<TaskEditScreenProps> = () => {
    const methods = useForm<AddTaskFormSubmissionData>({
        resolver: zodResolver(validationSchema)
    });
    const AddTaskInputField = FormInputField<AddTaskFormSubmissionData, FieldPath<AddTaskFormSubmissionData>>();

    const addTask = useAddTask(() => {Alert.alert('Success', 'Task has been added!')});
    const addTaskOnSubmit: SubmitHandler<AddTaskFormSubmissionData> = (data: AddTaskFormSubmissionData) => addTask.mutate(data);
    

    return (
        <Screen passedStyle={styles.container}>
            <AppForm methods={methods}>
                <AddTaskInputField
                    name='title'
                    control={methods.control}
                    icon='pencil'
                />
                <AddTaskInputField
                    name='deadline'
                    control={methods.control}
                    icon='alarm'
                    keyboardType="numeric"
                />
                <AddTaskInputField
                    name='priority'
                    control={methods.control}
                    icon='alert-circle-check-outline'
                    keyboardType="numeric"
                />
                <AddTaskInputField
                    name='executionTime'
                    control={methods.control}
                    icon='timer-sand'
                    keyboardType="numeric"
                />
                <FormSubmitButton
                    title='Submit'
                    onSubmit={addTaskOnSubmit}
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

