import { CACHE_KEY_TASKS } from "../../constants";
import { Task } from "../../types/data/Task";
import { useTaskService } from "../../services/TaskService";

import useAddMutation from "./useAddMutation";


const useAddTask = (onAdd: () => void) => {
  const TaskService = useTaskService();

  return useAddMutation<Task>(TaskService.post, CACHE_KEY_TASKS, onAdd);
}

export default useAddTask;
