import React from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Toast from "react-native-toast-message";

import { Task, taskSchema } from "../../types/data/Task";
import useAddTask from "../../hooks/mutations/useAddTask";
import FormInputField from "./FormInputField";
import createAppForm from "./AppForm";
import createFormSubmitButton from "./FormSubmitButton";
import CategoryPicker from "./dropdown/CategoryPicker";
import generateUniqueId from "../../utility/generateUniqueId";
import DateTimePicker from "./DateTimePicker";




const AddTaskForm: React.FC = () => {
    const AddTaskAppForm = createAppForm<Task>();
    const AddTaskButton = createFormSubmitButton<Task>();

    const toastSuccess = () => {
        Toast.show({
            type: 'success',
            text1: `Success`,
            text2: `Task added!`
        });
    }

    const addTask = useAddTask(toastSuccess);
    const addTaskOnSubmit = (data: Task) => { 
        const uId = generateUniqueId();
        const newTask = { ...data, uId };

        addTask.mutate(newTask); 
    }
    

    return (
        <AddTaskAppForm
            initialValues={{
                uId: '',
                title: '',
                description: '',
                priority: 0,
                deadline: new Date(),
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
            <DateTimePicker />
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
            <CategoryPicker />
            <AddTaskButton
                title='Submit'
            />
        </AddTaskAppForm>
    );
}





export default AddTaskForm;

