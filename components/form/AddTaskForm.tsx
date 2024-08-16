import React from "react";
import { Alert } from "react-native";

import { validationSchema, Task } from "../../types/data/Task";
import useAddTask from "../../hooks/mutations/useAddTask";
import useCategories from "../../hooks/useCategories";
import FormInputField from "./FormInputField";
import createAppForm from "./AppForm";
import createFormSubmitButton from "./FormSubmitButton";
import FormDropdownPicker from "./FormDropdownPicker";




const AddTaskForm: React.FC = () => {
    const AddTaskForm = createAppForm<Task>();
    const AddTaskButton = createFormSubmitButton<Task>();

    const { data, error, isLoading } = useCategories();
    const category_picker_data = data ?
        data?.map(cat => ({ label: cat.title, value: cat.title })).concat([{ label: 'Add new category...', value: 'add-new' }])
    : [];

    const addTask = useAddTask(() => {Alert.alert('Success', 'Task has been added!')});
    const addTaskOnSubmit = (data: Task) => addTask.mutate(data);
    

    return (
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
                data={category_picker_data}
            />
            <AddTaskButton
                title='Submit'
            />
        </AddTaskForm>
    );
}





export default AddTaskForm;

