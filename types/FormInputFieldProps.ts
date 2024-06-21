import { FieldPath, FieldValues, UseControllerProps } from "react-hook-form";


type FormInputFieldProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> = {
    id?: string
} & UseControllerProps<TFieldValues, TName>;




export default FormInputFieldProps;
