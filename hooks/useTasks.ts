import { useQuery } from '@tanstack/react-query';
import { CACHE_KEY_TASKS } from '../constants';
import TaskService, { Task } from "../services/TaskService";


const useTasks = () => {
    return useQuery<Task[], Error>({
        queryKey: CACHE_KEY_TASKS,
        queryFn: TaskService.getAll,
        staleTime: 10 * 1000
    });
};




export default useTasks;
