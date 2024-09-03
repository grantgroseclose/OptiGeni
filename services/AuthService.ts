import { TExistingUserSchema } from "../types/data/ExistingUser";
import { TNewUserSchema, newUserSchema } from "../types/data/NewUser";
import api from "./ApiInstance";
import { z } from "zod";
import APIClient from "../types/api/APIClient";




export type    LoginSuccessResponse = z.ZodObject<{ token: z.ZodString, firstname: z.ZodString }>;
export type RegisterSuccessResponse = TNewUserSchema;
export type       AuthErrorResponse = z.ZodObject<{ error: z.ZodString }>;


export type RegisterClientData = { 
    request: TNewUserSchema;
    response: z.ZodUnion<[RegisterSuccessResponse, AuthErrorResponse]>;
};

export type    LoginClientData = {
    request: TExistingUserSchema;
    response: z.ZodUnion<[LoginSuccessResponse, AuthErrorResponse]>;
};


const RegisterClientSchema = z.union([ newUserSchema, z.object({ error: z.string() }) ]);
const    LoginClientSchema = z.union([z.object({ token: z.string(), firstname: z.string() }), z.object({ error: z.string() }) ]);




export const useRegisterService = (): APIClient<RegisterClientData['request'], RegisterClientData['response']> => {
    return new APIClient<RegisterClientData['request'], RegisterClientData['response']>(api, '/auth/register', RegisterClientSchema);
};

export const useLoginService = (): APIClient<LoginClientData['request'], LoginClientData['response']> => {
    return new APIClient<LoginClientData['request'], LoginClientData['response']>(api, '/auth/login', LoginClientSchema);
};
