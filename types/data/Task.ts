import { z } from 'zod';
import { Status } from './Status';




const taskSchema = z.object({
    _id: z.string().optional(),
    title: z.string().min(2, 'Title must have at least 2 characters'),
    deadline: z.coerce.number().min(1, 'Deadline must be greater than 0'),
    priority: z.coerce.number().min(1, 'Priority must be greater than 0'),
    executionTime: z.coerce.number().min(1, 'Execution must be greater than 0'),
    categoryId: z.string().optional(),
    categoryTitle: z.string(),
    description: z.string(),
    status: z.enum(['Not started', 'In-progress', 'Complete']).optional()
});


type TTaskSchema = typeof taskSchema;
type        Task = z.infer<TTaskSchema>;

export { taskSchema, TTaskSchema, Task };