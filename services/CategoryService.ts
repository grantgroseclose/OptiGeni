import { useAuthStore } from "../store/auth";
import { Category } from "../types/data/Category";
import APIClient, { AuthHeader } from "./APIClient";




export const useCategoryService = (): APIClient<Category, Category> => {
    const authToken = useAuthStore(state => state.token);
    const authHeader: AuthHeader = { 'x-auth-token': authToken };

    return new APIClient<Category, Category>('/categories', authHeader);
};