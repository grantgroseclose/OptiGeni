import React from "react";
import {
    Alert,
  StyleSheet
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useField, useFormikContext } from "formik";
import FormInputFieldProps from "../../types/form/FormInputFieldProps";

import colors, { material_colors } from "../../config/colors";
import useModalStore from "../../store/modal";
import { screenWidth } from "../../config/dimensions";
import useDeleteTask from "../../hooks/mutations/useDeleteTask";
import { Task } from "../../types/data/Task";





type CardModDropdownProps = {
    task: Task;
};

const dropdownElements = [
    { label: 'Modify', value: 'modify'},
    { label: 'Delete', value: 'delete'}
]




const CardModDropdown: React.FC<CardModDropdownProps> = ({
    task,
    ...otherProps
}) => {
    const { toggleModal } = useModalStore();

    const deleteTask = useDeleteTask(() => {Alert.alert('Success', 'Task deleted!')});

    const deleteTaskOnSubmit = () => { 
        Alert.alert('Delete', 'Are you sure you want to delete this task?', [
            { text: "Yes", onPress: () => deleteTask.mutate(task) },
            { text: "No" }
        ]); 
    }

    const handleSelect = (item: { label: string, value: string }) => {
        if (item.value === 'delete') {
            deleteTaskOnSubmit();
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
        backgroundColor: material_colors.purple.accent3,
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