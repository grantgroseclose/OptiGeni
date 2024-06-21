import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CACHE_KEY_TASKS } from "../constants";
import TaskService, { Task } from "../services/TaskService";

interface AddTaskContext { 
  previousTasks: Task[]
}

const useAddTask = (onAdd: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, Task, AddTaskContext>({
    mutationFn: TaskService.post,

    onMutate: (newTask: Task) => {
      const previousTasks = queryClient.getQueryData<Task[]>(CACHE_KEY_TASKS) || [];

      queryClient.setQueryData<Task[]>(CACHE_KEY_TASKS, (tasks = []) => [
        newTask,
        ...tasks,
      ]);

      onAdd();

      return { previousTasks };
    },

    onSuccess: (savedTask, newTask) => {
      queryClient.setQueryData<Task[]>(CACHE_KEY_TASKS, (tasks) =>
        tasks?.map((task) =>
          task === newTask ? savedTask : task
        )
      );
    },

    onError: (error, newTask, context) => {
      if (!context) return;

      queryClient.setQueryData<Task[]>(CACHE_KEY_TASKS, context.previousTasks);
    }
  });
}

export default useAddTask;