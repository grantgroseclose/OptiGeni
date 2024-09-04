import { z } from "zod";



const categorySchema = z.object({
    uId: z.string().min(1).optional(),
    userId: z.string().optional(),
    title: z.string(),
    color: z.string()
});



type CategorySchema = typeof categorySchema;
type        Category = z.infer<CategorySchema>;


export { categorySchema, CategorySchema, Category };
