import { useAuthStore } from "../store/auth";
import { Category, TCategorySchema, categorySchema } from "../types/data/Category";
import api from "./ApiInstance";
import { AuthHeader } from "../types/api/AuthHeader";
import APIClient from "../types/api/APIClient";
import { z } from "zod";




export const useCategoryService = <TReqSchema extends z.ZodTypeAny, TResSchema extends z.ZodTypeAny>(schema: TResSchema): APIClient<TReqSchema, TResSchema> => {
    const authToken = useAuthStore(state => state.token);
    const authHeader: AuthHeader = { 'x-auth-token': authToken };

    return new APIClient<TReqSchema, TResSchema>(api, '/categories', schema, authHeader);
};

