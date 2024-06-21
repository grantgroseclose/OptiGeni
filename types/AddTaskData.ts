import { FieldValues } from 'react-hook-form';
import { z } from 'zod';


const validationSchema = z.object({
    title: z.string().min(1),
    deadline: z.preprocess(
        (a) => parseInt(z.string().parse(a), 10),
        z.number().positive().min(1)
    ),
    priority: z.preprocess(
        (a) => parseInt(z.string().parse(a), 10),
        z.number().positive().min(1)
    ),
    executionTime: z.preprocess(
        (a) => parseInt(z.string().parse(a), 10),
        z.number().positive().min(1)
    )
});
  
type AddTaskFormSubmissionData = z.infer<typeof validationSchema> & FieldValues;



export { validationSchema, AddTaskFormSubmissionData };
