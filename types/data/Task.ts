import { z } from 'zod';
import { Status } from './Status';




const taskSchema = z.object({
    uId: z.string().min(1).optional(),
    title: z.string().min(2, 'Title must have at least 2 characters'),
    deadline: z.coerce.date(),
    categoryId: z.string().optional(),
    categoryTitle: z.string(),
    description: z.string(),
    status: z.enum(['Not started', 'In-progress', 'Complete']).optional()
});


type TaskSchema = typeof taskSchema;
type        Task = z.infer<TaskSchema>;

export { taskSchema, TaskSchema, Task };