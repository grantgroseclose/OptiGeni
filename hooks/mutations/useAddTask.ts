import { CACHE_KEY_TASKS, TASK_ENDPOINTS } from "../../constants";
import { Task, taskSchema } from "../../types/data/Task";
import { useTaskService } from "../../services/TaskService";
import useAddMutation from "./useAddMutation";




const useAddTask = (onAdd: () => void) => {
	const TaskService = useTaskService(TASK_ENDPOINTS['TASKS'], taskSchema);

	return useAddMutation<Task>(TaskService.post, CACHE_KEY_TASKS, onAdd);
}


export default useAddTask;
