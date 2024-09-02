import { create } from "zustand";
import { Task } from "../types/data/Task";




interface TaskStore {
    task: Task;
    setTask: (task: Task) => void;
    getTask: () => Task;
}



export const useTaskStore = create<TaskStore>(
    (set, get) => ({
        task: {} as Task,
        setTask: (task: Task) => 
            set((state) => ({
                task: task
            })) 
        ,
        getTask: () => get().task,
    })
);