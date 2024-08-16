import * as Yup from 'yup';



const validationSchema = Yup.object({
    userId: Yup.string(),
    title: Yup.string().required('Title is required'),
    color: Yup.string().required('Color is required')
});



type Category = Yup.InferType<typeof validationSchema>;


export { validationSchema, Category };
