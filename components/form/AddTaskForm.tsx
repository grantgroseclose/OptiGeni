import React from "react";
import { Alert } from "react-native";

import { Task, taskSchema } from "../../types/data/Task";
import useAddTask from "../../hooks/mutations/useAddTask";
import useCategories from "../../hooks/useCategories";
import FormInputField from "./FormInputField";
import createAppForm from "./AppForm";
import createFormSubmitButton from "./FormSubmitButton";
import AddCategoryDropdownPicker from "./dropdown/AddCategoryDropdownPicker";
import { toFormikValidationSchema } from "zod-formik-adapter";




const AddTaskForm: React.FC = () => {
    const AddTaskForm = createAppForm<Task>();
    const AddTaskButton = createFormSubmitButton<Task>();

    const addTask = useAddTask(() => {Alert.alert('Success', 'Task has been added!')});
    const addTaskOnSubmit = (data: Task) => addTask.mutate(data);
    

    return (
        <AddTaskForm
            initialValues={{
                uId: '',
                title: '',
                description: '',
                priority: 0,
                deadline: 0,
                executionTime: 0,
                categoryTitle: '',
            }}
            validationSchema={toFormikValidationSchema(taskSchema)}
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
            <AddCategoryDropdownPicker />
            <AddTaskButton
                title='Submit'
            />
        </AddTaskForm>
    );
}





export default AddTaskForm;

