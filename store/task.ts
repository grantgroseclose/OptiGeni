import { create } from "zustand";
import { Task } from "../types/data/Task";




interface TaskStore {
    task: Task;
    setTask: (task: Task) => void;
}



export const useTaskStore = create<TaskStore>(
    (set) => ({
        task: {} as Task,
        setTask: (task: Task) => 
            set((state) => ({
                task: task
            }))
    })
);