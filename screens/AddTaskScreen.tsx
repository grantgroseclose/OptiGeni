import React from "react";
import { Alert, StyleSheet, View } from "react-native";
import { RootTabParamList } from '../navigation/AppNavigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import Screen from "../components/Screen";
import useAddTask from "../hooks/mutations/useAddTask";
import FormInputField from "../components/form/FormInputField";

import { validationSchema, Task } from "../types/data/Task";
import AppFormFC from "../components/form/AppForm";
import AddTaskButtonFC from "../components/form/FormSubmitButton";
import FormDropdownPickerFC from "../components/form/FormDropdownPicker";
import { Category } from "../services/CategoryService";
import useCategories from "../hooks/useCategories";




type AddTaskScreenProps = BottomTabScreenProps<RootTabParamList, 'AddTask'>;


const AddTaskScreen: React.FC<AddTaskScreenProps> = () => {
    const AddTaskForm = AppFormFC<Task>();
    const AddTaskButton = AddTaskButtonFC<Task>();
    const FormDropdownPicker = FormDropdownPickerFC<Category>();

    const { data, error, isLoading } = useCategories();

    const addTask = useAddTask(() => {Alert.alert('Success', 'Task has been added!')});
    const addTaskOnSubmit = (data: Task) => addTask.mutate(data);
    

    return (
        <Screen passedStyle={styles.container}>
            <View style={{width: '92.5%', alignSelf: 'center'}}>
                <AddTaskForm
                    initialValues={{
                        title: '',
                        description: '',
                        priority: 0,
                        deadline: 0,
                        executionTime: 0,
                        categoryTitle: '',
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
                        name='description'
                        icon='note-edit'
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
                    <FormDropdownPicker 
                        name='categoryTitle'
                        data={data}
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


export default AddTaskScreen;

