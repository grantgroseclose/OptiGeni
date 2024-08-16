import React from "react";
import {
  StyleSheet
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useField, useFormikContext } from "formik";
import FormInputFieldProps from "../../types/form/FormInputFieldProps";

import colors from "../../config/colors";
import AddCategoryModal from "../modal/AddCategoryModal";
import useModalStore from "../../store/modal";





type DropdownComponentProps = {
    data: { label: string; value: string; }[];
} & FormInputFieldProps;




const FormDropdownPicker: React.FC<DropdownComponentProps> = ({
    data,
    ...otherProps
}) => {
    const { toggleModal } = useModalStore();
    const { handleChange, setFieldValue } = useFormikContext();
    const [ field, meta, helpers ] = useField(otherProps);

    const handleSelect = (item: { label: string, value: string }) => {
        if (item.value === 'add-new') {
            toggleModal();
        }
        else setFieldValue(field.name, item.label);
    }


    return (
      <>
          <AddCategoryModal />

          <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data ? data : []}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select category"
              searchPlaceholder="Search..."
              value={field.value}
              onChange={handleSelect}
              renderLeftIcon={() => (
                  <MaterialCommunityIcons style={styles.icon} color="gray" name="menu" size={20} />
              )}
          />
      </>
    );
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