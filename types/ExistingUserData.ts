import * as Yup from 'yup';



const validationSchema = Yup.object({
    username: Yup.string().min(5, 'Username must have at least 5 characters').required('Username is required'),
    password: Yup.string().min(5, 'Password must have at least 5 characters').required('Password is required')
});
  
type ExistingUserData = Yup.InferType<typeof validationSchema>;



export { validationSchema, ExistingUserData };
