import { useQuery } from '@tanstack/react-query';
import { CACHE_KEY_TASKS, TASK_ENDPOINTS } from '../constants';
import { Task, taskSchema } from '../types/data/Task';
import { useTaskService } from '../services/TaskService';
import { useErrorStore } from '../store/error';




const useTasks = () => {
    const TaskService = useTaskService(TASK_ENDPOINTS['TASKS']);
    const setError = useErrorStore(state => state.setError);
    const clearError = useErrorStore(state => state.clearError);

    return useQuery<Task[], Error>({
        queryKey: CACHE_KEY_TASKS,
        queryFn: async () => {
            clearError();
            const res = await TaskService.getAll();

            if ('error' in res) {
                const err = res.error as string;
                setError(err);
                return Promise.reject(err);
            }

            return res as Task[];
        },
        staleTime: 10 * 1000
    });
};




export default useTasks;
