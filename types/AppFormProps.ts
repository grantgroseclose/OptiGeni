import { ReactNode } from "react";
import { FieldValues, UseFormProps } from "react-hook-form";
import { ZodObject, ZodRawShape } from "zod";


type AppFormProps<TFieldValues extends FieldValues, TValidationSchema extends ZodObject<ZodRawShape>> = UseFormProps<TFieldValues> & {
    schema: TValidationSchema;
    children: ReactNode;
};



export default AppFormProps;
