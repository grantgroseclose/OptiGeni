import { useAuthStore } from "../store/auth";
import APIClient, { AuthHeader } from "./APIClient";
import { Task } from "../types/data/Task";




export const useTaskService = (): APIClient<Task, Task> => {
    const authToken = useAuthStore(state => state.token);
    const authHeader: AuthHeader = { 'x-auth-token': authToken };

    return new APIClient<Task, Task>('/tasks', authHeader);
};