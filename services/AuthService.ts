import { ExistingUserData } from "../types/ExistingUserData";
import { NewUserData } from "../types/NewUserData";
import { TApiResponse } from "../types/ApiResponse";
import APIClient from "./APIClient";




export const RegisterService = new APIClient<NewUserData, TApiResponse<NewUserData>>('/auth/register');
export const LoginService = new APIClient<ExistingUserData, TApiResponse<string>>('/auth/login');

