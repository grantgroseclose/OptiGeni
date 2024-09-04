import { useAuthStore } from "../store/auth";
import { CategorySchema, categorySchema } from "../types/data/Category";
import api from "./ApiInstance";
import { AuthHeader } from "../types/api/AuthHeader";
import APIClient from "../types/api/APIClient";




export type CategoryServiceData = {
    request: CategorySchema;
    response: CategorySchema;
};


export const useCategoryService = (schema: CategoryServiceData['response'] = categorySchema) : APIClient<CategoryServiceData['request'], CategoryServiceData['response']> => {
    const authToken = useAuthStore(state => state.token);
    const authHeader: AuthHeader = { 'x-auth-token': authToken };

    return new APIClient<CategoryServiceData['request'], CategoryServiceData['response']>(
        api,
        '/categories',
        schema,
        authHeader
    );
};
