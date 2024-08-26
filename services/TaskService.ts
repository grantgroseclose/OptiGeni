import { useAuthStore } from "../store/auth";
import { Task, TTaskSchema, taskSchema } from "../types/data/Task";
import api from "./ApiInstance";
import { AuthHeader } from "../types/api/AuthHeader";
import APIClient from "../types/api/APIClient";




export const useTaskService = (): APIClient<TTaskSchema, TTaskSchema, Task> => {
    const authToken = useAuthStore(state => state.token);
    const authHeader: AuthHeader = { 'x-auth-token': authToken };

    return new APIClient<TTaskSchema, TTaskSchema, Task>(api, '/tasks', taskSchema, authHeader);
};