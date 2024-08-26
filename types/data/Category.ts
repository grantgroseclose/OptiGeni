import { z } from "zod";



const categorySchema = z.object({
    userId: z.string().optional(),
    title: z.string(),
    color: z.string()
});



type TCategorySchema = typeof categorySchema;
type        Category = z.infer<TCategorySchema>;


export { categorySchema, TCategorySchema, Category };
