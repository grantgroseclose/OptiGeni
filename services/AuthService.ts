import { ExistingUserSchema } from "../types/data/ExistingUser";
import { NewUserSchema, newUserSchema } from "../types/data/NewUser";
import api from "./ApiInstance";
import { z } from "zod";
import APIClient from "../types/api/APIClient";




export type AuthServiceRegisterData = { 
    request: NewUserSchema;
    response: NewUserSchema;
};

export type    AuthServiceLoginData = {
    request: ExistingUserSchema;
    response: z.ZodObject<{ token: z.ZodString, firstname: z.ZodString }>;
};

const loginSchema = z.object({ token: z.string(), firstname: z.string() });




export const useRegisterService = (): APIClient<AuthServiceRegisterData['request'], AuthServiceRegisterData['response']> => {
    return new APIClient<AuthServiceRegisterData['request'], AuthServiceRegisterData['response']>(api, '/auth/register', newUserSchema);
};


export const useLoginService = (): APIClient<AuthServiceLoginData['request'], AuthServiceLoginData['response']> => {
    return new APIClient<AuthServiceLoginData['request'], AuthServiceLoginData['response']>(api, '/auth/login', loginSchema);
};
