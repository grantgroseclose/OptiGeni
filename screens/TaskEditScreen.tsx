import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { RootTabParamList } from '../navigation/AppNavigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import Screen from "../components/Screen";
import useAddTask from "../hooks/mutations/useAddTask";
import FormInputField from "../components/forms/FormInputField";

import { validationSchema, AddTaskFormSubmissionData } from "../types/AddTaskData";
import AppFormFC from "../components/forms/AppForm";
import AddTaskButtonFC from "../components/forms/FormSubmitButton";




type TaskEditScreenProps = BottomTabScreenProps<RootTabParamList, 'TaskEdit'>;


const TaskEditScreen: React.FC<TaskEditScreenProps> = () => {
    const AddTaskForm = AppFormFC<AddTaskFormSubmissionData>();
    const AddTaskButton = AddTaskButtonFC<AddTaskFormSubmissionData>();

    const addTask = useAddTask(() => {Alert.alert('Success', 'Task has been added!')});
    const addTaskOnSubmit = (data: AddTaskFormSubmissionData) => addTask.mutate(data);
    

    return (
        <Screen passedStyle={styles.container}>
            <View style={{width: '92.5%', alignSelf: 'center'}}>
                <AddTaskForm
                    initialValues={{
                        title: '',
                        priority: 0,
                        deadline: 0,
                        executionTime: 0
                    }}
                    validationSchema={validationSchema}
                    style={{}}
                    onSubmit={addTaskOnSubmit}
                >
                    <FormInputField
                        name='title'
                        icon='pencil'
                    />
                    <FormInputField
                        name='deadline'
                        icon='alarm'
                        keyboardType="numeric"
                    />
                    <FormInputField
                        name='priority'
                        icon='alert-circle-check-outline'
                        keyboardType="numeric"
                    />
                    <FormInputField
                        name='executionTime'
                        icon='timer-sand'
                        keyboardType="numeric"
                    />
                    <AddTaskButton
                        title='Submit'
                    />
                </AddTaskForm>
            </View>
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

