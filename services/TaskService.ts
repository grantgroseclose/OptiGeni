import { useAuthStore } from "../store/auth";
import api from "./ApiInstance";
import { AuthHeader } from "../types/api/AuthHeader";
import APIClient from "../types/api/APIClient";
import { TaskSchema, taskSchema } from "../types/data/Task";




export type TaskServiceData = {
    request: TaskSchema;
    response: TaskSchema;
};


export const useTaskService = (endpoint: string, schema: TaskServiceData['response'] = taskSchema) : APIClient<TaskServiceData['request'], TaskServiceData['response']> => {
    const authToken = useAuthStore(state => state.token);
    const authHeader: AuthHeader = { 'x-auth-token': authToken };

    return new APIClient<TaskServiceData['request'], TaskServiceData['response']>(
        api,
        endpoint,
        schema,
        authHeader
    );
};
