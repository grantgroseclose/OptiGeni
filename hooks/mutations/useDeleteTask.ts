import { CACHE_KEY_TASKS } from "../../constants";
import { Task } from "../../types/data/Task";
import { useTaskService } from "../../services/TaskService";
import useDeleteMutation from "./useDeleteMutation";




const useDeleteTask = (onDelete: () => void) => {
    const TaskService = useTaskService();

    return useDeleteMutation<Task>(TaskService.delete, CACHE_KEY_TASKS, onDelete);
}


export default useDeleteTask;
