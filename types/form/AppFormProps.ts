import { ReactNode } from "react";
import { FormikValues, FormikErrors } from "formik";
import * as Yup from 'yup';


type AppFormProps<TFieldValues extends FormikValues> = {
    initialValues: TFieldValues;
    validationSchema: Yup.ObjectSchema<TFieldValues>;
    onSubmit: (values: TFieldValues) => void;
    style: Object;
    errors?: FormikErrors<TFieldValues>;
    children?: ReactNode;
};



export default AppFormProps;
