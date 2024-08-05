import React from "react";
import { View } from 'react-native';
import { Formik, FormikValues } from "formik";

import AppFormProps from "../../types/AppFormProps";



const AppFormElement = <TFieldValues extends FormikValues>({
    style,
    initialValues,
    onSubmit,
    validationSchema,
    children
}: AppFormProps<TFieldValues>) => {

    return (
        <View style={style}>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                {() => <>{children}</>}
            </Formik>
        </View>
    );
};


const AppForm = <TFieldValues extends FormikValues>() => {
    const WrappedAppFormElement: React.FC<AppFormProps<TFieldValues>> = (props) => <AppFormElement {...props} />;
    return WrappedAppFormElement;
};








export default AppForm;
