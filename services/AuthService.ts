import { ExistingUserData } from "../types/ExistingUserData";
import { NewUserData } from "../types/NewUserData";
import { TApiResponse } from "../types/ApiResponse";
import APIClient from "./APIClient";



export const useRegisterService = (): APIClient<NewUserData, TApiResponse<NewUserData>> => {
    return new APIClient<NewUserData, TApiResponse<NewUserData>>('/auth/register');
};

export const useLoginService = (): APIClient<ExistingUserData, TApiResponse<string>> => {
    return new APIClient<ExistingUserData, TApiResponse<string>>('/auth/login');
};