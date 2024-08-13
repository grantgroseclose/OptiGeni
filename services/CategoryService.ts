import { useAuthStore } from "../store/auth";
import APIClient, { AuthHeader } from "./APIClient";


export type Category = {
    userId: string;
    title: string;
    color: string;
};



export const useCategoryService = (): APIClient<Category, Category> => {
    const authToken = useAuthStore(state => state.token);
    const authHeader: AuthHeader = { 'x-auth-token': authToken };

    return new APIClient<Category, Category>('/categories', authHeader);
};