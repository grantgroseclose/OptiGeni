import React from "react";
import {
  StyleSheet
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useField, useFormikContext } from "formik";
import FormInputFieldProps from "../../types/form/FormInputFieldProps";

import colors, { material_colors } from "../../config/colors";
import useModalStore from "../../store/modal";
import { screenWidth } from "../../config/dimensions";





type CardModDropdownProps = {
    data: { label: string; value: string; }[];
};

const dropdownElements = [
    { label: 'Modify', value: 'modify'},
    { label: 'Delete', value: 'delete'}
]




const CardModDropdown: React.FC = ({
    // data,
    ...otherProps
}) => {
    const { toggleModal } = useModalStore();

    const handleSelect = (item: { label: string, value: string }) => {
        if (item.value === 'add-new') {
            toggleModal();
        }
    }


    return (
        <Dropdown
            style={styles.dropdown}
            containerStyle={styles.container}
            itemContainerStyle={styles.itemContainer}
            fontFamily="Inter-Medium"
            itemTextStyle={styles.text}
            search={false}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            // iconStyle={styles.iconStyle}
            // data={data ? data : []}
            data={dropdownElements}
            maxHeight={300}
            labelField="label"
            valueField="value"
            onChange={handleSelect}
            renderRightIcon={() => (
                <MaterialCommunityIcons style={styles.icon} color="gray" name="dots-horizontal" size={24} />
            )}
        />
    );
};




const styles = StyleSheet.create({
    dropdown: {
        alignSelf: 'flex-start',
        margin: 0,
        padding: 0
    },
    container: {
        width: '37.5%',
        left: '56.25%',
        backgroundColor: material_colors.grey.darken4,
        borderWidth: 0,
        borderRadius: 15,
        shadowColor: material_colors.shades.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5
    },
    itemContainer: {
        // backgroundColor: material_colors.deep_orange.accent4
    },
    text: {
        color: material_colors.grey.lighten2
    },
    icon: {
    //   marginRight: 5,
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


export default CardModDropdown;