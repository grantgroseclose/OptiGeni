import { z } from "zod";



const existingUserSchema = z.object({
    username: z.string().min(5, 'Username must have at least 5 characters'),
    password: z.string().min(5, 'Password must have at least 5 characters')
});
  
type TExistingUserSchema = typeof existingUserSchema;
type        ExistingUser = z.infer<TExistingUserSchema>;



export { existingUserSchema, TExistingUserSchema, ExistingUser };
