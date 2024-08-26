import { CACHE_KEY_TASKS } from "../../constants";
import { Task } from "../../types/data/Task";
import { useTaskService } from "../../services/TaskService";

import useAddMutation from "./useAddMutation";
import generateUniqueId from "../../utility/generateUniqueId";


const useAddTask = (onAdd: () => void) => {
  const TaskService = useTaskService();

  const mutationFn = (item: Task) => {
    const uId = generateUniqueId();
    const taskWithUId = { ...item, uId };

    return TaskService.post(taskWithUId);
  }

  return useAddMutation<Task>(mutationFn, CACHE_KEY_TASKS, onAdd);
}

export default useAddTask;
