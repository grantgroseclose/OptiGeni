import { z } from "zod";



const newUserSchema = z.object({
    username: z.string().min(5, 'Username must have at least 5 characters'),
    password: z.string().min(5, 'Password must have at least 5 characters'),
    firstname: z.string().min(1, 'First name must have at least 1 character')
});
  
type NewUserSchema = typeof newUserSchema;
type        NewUser = z.infer<NewUserSchema>;



export { newUserSchema, NewUserSchema, NewUser };
