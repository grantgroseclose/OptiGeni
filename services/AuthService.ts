import { TExistingUserSchema } from "../types/data/ExistingUser";
import { TNewUserSchema, newUserSchema } from "../types/data/NewUser";
import api from "./ApiInstance";
import { z, ZodObject, ZodString, ZodType, ZodUnion } from "zod";
import APIClient from "../types/api/APIClient";




export type RegisterClientData = { 
    request: TNewUserSchema;
    response: ZodUnion<[TNewUserSchema, z.ZodObject<{ error: z.ZodString }>]>;
}

export type LoginClientData = {
    request: TExistingUserSchema;
    response: ZodUnion<[z.ZodString, z.ZodObject<{ error: z.ZodString }>]>;
}


const RegisterClientSchema = z.union([ newUserSchema, z.object({ error: z.string() }) ]);
const LoginClientSchema = z.union([ z.string(), z.object({ error: z.string() }) ]);




export const useRegisterService = (): APIClient<RegisterClientData['request'], RegisterClientData['response']> => {
    return new APIClient<RegisterClientData['request'], RegisterClientData['response']>(api, '/auth/register', RegisterClientSchema);
};

export const useLoginService = (): APIClient<LoginClientData['request'], LoginClientData['response']> => {
    return new APIClient<LoginClientData['request'], LoginClientData['response']>(api, '/auth/login', LoginClientSchema);
};
