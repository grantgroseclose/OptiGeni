import { useAuthStore } from "../store/auth";
import { Category, TCategorySchema, categorySchema } from "../types/data/Category";
import api from "./ApiInstance";
import { AuthHeader } from "../types/api/AuthHeader";
import APIClient from "../types/api/APIClient";




export const useCategoryService = (): APIClient<TCategorySchema, TCategorySchema, Category> => {
    const authToken = useAuthStore(state => state.token);
    const authHeader: AuthHeader = { 'x-auth-token': authToken };

    return new APIClient<TCategorySchema, TCategorySchema, Category>(api, '/categories', categorySchema, authHeader);
};