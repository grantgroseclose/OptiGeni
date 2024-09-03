import React from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Toast from "react-native-toast-message";

import { Task, taskSchema } from "../../types/data/Task";
import createAppForm from "./AppForm";
import createFormSubmitButton from "./FormSubmitButton";

import StatusDropdown from "./dropdown/StatusDropdown";
import useUpdateTask from "../../hooks/mutations/useUpdateTask";
import useModal from "../../hooks/useModal";
import { appModals, UpdateTaskModal } from "../../store/modal";
import { useTaskStore } from "../../store/task";




const toastSuccess = () => {
    Toast.show({
        type: 'success',
        text1: `Success`,
        text2: `Task updated!`
    });
}


const UpdateTaskForm: React.FC = () => {
    const { getTask } = useTaskStore();
    const task = getTask();

    const { toggleModal } = useModal<UpdateTaskModal>(appModals['UpdateTask']);
    const updateTask = useUpdateTask(toastSuccess);

    const UpdateTaskAppForm = createAppForm<Task>();
    const UpdateTaskButton = createFormSubmitButton<Task>();

    const updateTaskOnSubmit = (data: Task) => { 
        updateTask.mutate(data);
        toggleModal();
    }
    

    return (
        <UpdateTaskAppForm
            initialValues={{
                uId: task['uId'],
                title: task['title'],
                deadline: task['deadline'],
                categoryId: task['categoryId'],
                categoryTitle: task['categoryTitle'],
                description: task['description'],
                status: task['status']
            }}
            validationSchema={toFormikValidationSchema(taskSchema)}
            style={{}}
            onSubmit={updateTaskOnSubmit}
        >
            <StatusDropdown name='status' />
            <UpdateTaskButton
                title='Update'
            />
        </UpdateTaskAppForm>
    );
}





export default UpdateTaskForm;

