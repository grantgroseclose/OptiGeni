import * as Yup from 'yup';



const validationSchema = Yup.object({
    username: Yup.string().min(5, 'Username must have at least 5 characters').required('Username is required'),
    password: Yup.string().min(5, 'Password must have at least 5 characters').required('Password is required'),
    firstname: Yup.string().min(1, 'First name must have at least 1 character').required('First name is required')
});
  
type NewUserData = Yup.InferType<typeof validationSchema>;



export { validationSchema, NewUserData };
