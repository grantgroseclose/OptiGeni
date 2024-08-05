import * as Yup from 'yup';



const validationSchema = Yup.object({
    title: Yup.string().min(1, {message: 'Title is required'}).required(),
    deadline: Yup.number().min(1, {message: 'Deadline is required'}).required(),
    priority: Yup.number().min(1, {message: 'Priority is required'}).required(),
    executionTime: Yup.number().min(1, {message: 'Execution time is required'}).required(),
});
  
type AddTaskFormSubmissionData = Yup.InferType<typeof validationSchema>;



export { validationSchema, AddTaskFormSubmissionData };
