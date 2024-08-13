import * as Yup from 'yup';



const validationSchema = Yup.object({
    title: Yup.string().min(2, 'Title must have at least 2 characters').required('Title is required'),
    deadline: Yup.number().min(1, 'Deadline must be greater than 0').required('Deadline is required'),
    priority: Yup.number().min(1, 'Priority must be greater than 0').required('Priority is required'),
    executionTime: Yup.number().min(1, 'Execution must be greater than 0').required('Execution time is required'),
    category: Yup.string().required('Category is required')
});
  
type AddTaskData = Yup.InferType<typeof validationSchema>;



export { validationSchema, AddTaskData };
