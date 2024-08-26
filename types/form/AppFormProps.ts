import { ReactNode } from "react";
import { FormikValues, FormikErrors } from "formik";


type AppFormProps<TFieldValues extends FormikValues> = {
    initialValues: TFieldValues;
    validationSchema: { validate: (obj: TFieldValues) => Promise<void>; };
    onSubmit: (values: TFieldValues) => void;
    style: Object;
    errors?: FormikErrors<TFieldValues>;
    children?: ReactNode;
};



export default AppFormProps;
