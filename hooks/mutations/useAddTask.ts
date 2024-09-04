import { CACHE_KEY_TASKS, TASK_ENDPOINTS } from "../../constants";
import { Task, taskSchema } from "../../types/data/Task";
import { useTaskService } from "../../services/TaskService";
import useAddMutation from "./useAddMutation";
import { useErrorStore } from "../../store/error";




const useAddTask = (onAdd: () => void) => {
	const TaskService = useTaskService(TASK_ENDPOINTS['TASKS']);
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

	return useAddMutation<Task>(mutationFn, CACHE_KEY_TASKS, onAdd);
}


export default useAddTask;
