import { TextInputProps } from "react-native";


type InputProps = {
    label?: string;
    placeholder?: string;
    keyboardType?: TextInputProps['keyboardType'];
    icon?: React.ReactNode;
} & TextInputProps;




export default InputProps;
