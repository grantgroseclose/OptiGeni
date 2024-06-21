import { CACHE_KEY_TASKS } from "../../constants";
import TaskService, { Task } from "../../services/TaskService";

import useAddMutation from "./useAddMutation";


const useAddTask = (onAdd: () => void) => {
  return useAddMutation<Task>(TaskService.post, CACHE_KEY_TASKS, onAdd);
}

export default useAddTask;
