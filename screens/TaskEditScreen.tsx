import React from "react";
import { Alert, StyleSheet } from "react-native";
import { FieldPath, SubmitHandler } from "react-hook-form";
import { RootTabParamList } from '../navigation/AppNavigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import Screen from "../components/Screen";
import useAddTask from "../hooks/mutations/useAddTask";
import FormInputField from "../components/forms/FormInputField";
import FormSubmitButton from "../components/forms/FormSubmitButton";

import { validationSchema, AddTaskFormSubmissionData } from "../types/AddTaskData";
import AppFormFC from "../components/forms/AppForm";




type TaskEditScreenProps = BottomTabScreenProps<RootTabParamList, 'TaskEdit'>;


const TaskEditScreen: React.FC<TaskEditScreenProps> = () => {
    const AppForm = AppFormFC<AddTaskFormSubmissionData, typeof validationSchema>();
    const AddTaskInputField = FormInputField<AddTaskFormSubmissionData, FieldPath<AddTaskFormSubmissionData>>();

    const addTask = useAddTask(() => {Alert.alert('Success', 'Task has been added!')});
    const addTaskOnSubmit: SubmitHandler<AddTaskFormSubmissionData> = (data: AddTaskFormSubmissionData) => addTask.mutate(data);
    

    return (
        <Screen passedStyle={styles.container}>
            <AppForm schema={validationSchema}>
                <AddTaskInputField
                    name='title'
                    icon='pencil'
                />
                <AddTaskInputField
                    name='deadline'
                    icon='alarm'
                    keyboardType="numeric"
                />
                <AddTaskInputField
                    name='priority'
                    icon='alert-circle-check-outline'
                    keyboardType="numeric"
                />
                <AddTaskInputField
                    name='executionTime'
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

