import { CACHE_KEY_TASKS, TASK_ENDPOINTS } from "../../constants";
import { Task, taskSchema } from "../../types/data/Task";
import { useTaskService } from "../../services/TaskService";
import useDeleteMutation from "./useDeleteMutation";




const useDeleteTask = (onDelete: () => void) => {
    const TaskService = useTaskService(TASK_ENDPOINTS['TASKS'], taskSchema);

    return useDeleteMutation<Task>(TaskService.delete, CACHE_KEY_TASKS, onDelete);
}


export default useDeleteTask;
