import { ExistingUserData } from "../types/ExistingUserData";
import { NewUserData } from "../types/NewUserData";
import APIClient from "./APIClient";




export const RegisterService = new APIClient<NewUserData, string>('/auth/register');
export const LoginService = new APIClient<ExistingUserData, string>('/auth/login');

