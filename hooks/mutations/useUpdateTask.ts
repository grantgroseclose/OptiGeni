import { CACHE_KEY_TASKS, TASK_ENDPOINTS } from "../../constants";
import { Task, taskSchema } from "../../types/data/Task";
import { useTaskService } from "../../services/TaskService";
import useUpdateMutation from "./useUpdateMutation";




const useUpdateTask = (onAdd: () => void) => {
	const TaskService = useTaskService(TASK_ENDPOINTS['TASK'], taskSchema);

	return useUpdateMutation<Task>(TaskService.post, CACHE_KEY_TASKS, onAdd);
}


export default useUpdateTask;
