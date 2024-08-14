import { ExistingUser } from "../types/data/ExistingUser";
import { NewUser } from "../types/data/NewUser";
import { TApiResponse } from "../types/api/ApiResponse";
import APIClient from "./APIClient";



export const useRegisterService = (): APIClient<NewUser, TApiResponse<NewUser>> => {
    return new APIClient<NewUser, TApiResponse<NewUser>>('/auth/register');
};

export const useLoginService = (): APIClient<ExistingUser, TApiResponse<string>> => {
    return new APIClient<ExistingUser, TApiResponse<string>>('/auth/login');
};