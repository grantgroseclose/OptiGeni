import * as Yup from 'yup';
import { Status } from './Status';




const validationSchema = Yup.object({
    title: Yup.string().min(2, 'Title must have at least 2 characters').required('Title is required'),
    deadline: Yup.number().min(1, 'Deadline must be greater than 0').required('Deadline is required'),
    priority: Yup.number().min(1, 'Priority must be greater than 0').required('Priority is required'),
    executionTime: Yup.number().min(1, 'Execution must be greater than 0').required('Execution time is required'),
    categoryId: Yup.string(),
    categoryTitle: Yup.string().required('Category is required'),
    description: Yup.string().required('Description is required'),
    status: Yup.string().oneOf<Status>(['Not started', 'In-progress', 'Complete'])
});



type Task = Yup.InferType<typeof validationSchema>;

export { validationSchema, Task };
