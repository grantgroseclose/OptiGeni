import React from "react";
import { View } from 'react-native';
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodObject, ZodRawShape } from "zod";
import AppFormProps from "../../types/AppFormProps";




const AppFormElement = <TFieldValues extends FieldValues, TValidationSchema extends ZodObject<ZodRawShape>>({
    schema,
    children
}: AppFormProps<TFieldValues, TValidationSchema>) => {
    const methods = useForm<TFieldValues>({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    return (
        <FormProvider {...methods}>
            <View style={{width: '92.5%', alignSelf: 'center'}}>
                {children}
            </View>
        </FormProvider>
    );
};


const AppForm = <TFieldValues extends FieldValues, TValidationSchema extends ZodObject<ZodRawShape>>() => {
    const WrappedAppFormElement: React.FC<AppFormProps<TFieldValues, TValidationSchema>> = (props) => <AppFormElement {...props} />;
    return WrappedAppFormElement;
};










export default AppForm;
