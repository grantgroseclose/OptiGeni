import React from "react";
import {
  StyleSheet
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useField, useFormikContext } from "formik";
import { UseQueryResult } from "@tanstack/react-query";
import FormInputFieldProps from "../../types/form/FormInputFieldProps";
import { Category } from "../../services/CategoryService";

import colors from "../../config/colors";




type DropdownComponentProps<TData> = {
    data: TData[] | undefined;
} & FormInputFieldProps;


// TODO: refactor data type
const DropdownComponent = <TData extends Category>({
    data,
    ...otherProps
}: DropdownComponentProps<TData>) => {
    const { handleChange, setFieldValue } = useFormikContext();
    const [ field, meta, helpers ] = useField(otherProps);

    return (
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data ? data : []}
            search
            maxHeight={300}
            labelField="title"
            valueField="title"
            placeholder="Select category"
            searchPlaceholder="Search..."
            value={field.value}
            onChange={(item: TData) => {
                setFieldValue(field.name, item.title);
            }}
            renderLeftIcon={() => (
                <MaterialCommunityIcons style={styles.icon} color="gray" name="menu" size={20} />
            )}
        />
    );
};


const FormDropdownPicker = <TData extends Category>() => {
    const WrappedAppFormElement: React.FC<DropdownComponentProps<TData>> = (props) => <DropdownComponent {...props} />;
    return WrappedAppFormElement;
};




const styles = StyleSheet.create({
    dropdown: {
        backgroundColor: colors.light,
        borderRadius: 25,
        width: '100%',
        padding: 15,
        marginVertical: 10
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
      color: 'gray'
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
      color: 'gray'
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
});


export default FormDropdownPicker;