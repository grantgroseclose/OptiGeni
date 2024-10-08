import { CACHE_KEY_TASKS, TASK_ENDPOINTS } from "../../constants";
import { Task, taskSchema } from "../../types/data/Task";
import { useTaskService } from "../../services/TaskService";
import useUpdateMutation from "./useUpdateMutation";
import { useErrorStore } from "../../store/error";




const useUpdateTask = (onUpdate: () => void) => {
	const TaskService = useTaskService(TASK_ENDPOINTS['TASK']);
	const setError = useErrorStore(state => state.setError);
    const clearError = useErrorStore(state => state.clearError);

	const mutationFn = async (item: Task) => {
		clearError();
		const res = await TaskService.post(item);

		if ('error' in res) {
			const err = res.error as string;
			setError(err);
			return Promise.reject(err);
		}

		return res as Task;
	}

	return useUpdateMutation<Task>(mutationFn, CACHE_KEY_TASKS, onUpdate);
}


export default useUpdateTask;
