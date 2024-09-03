import React from "react";
import {
    Alert,
  StyleSheet
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from "react-native-toast-message";

import { material_colors } from "../../config/colors";
import { appModals, UpdateTaskModal } from "../../store/modal";
import useDeleteTask from "../../hooks/mutations/useDeleteTask";
import { Task } from "../../types/data/Task";
import useModal from "../../hooks/useModal";
import { useTaskStore } from "../../store/task";





type CardModDropdownProps = {
    task: Task;
};

const dropdownElements = [
    { label: 'Update', value: 'update'},
    { label: 'Delete', value: 'delete'}
]




const CardModDropdown: React.FC<CardModDropdownProps> = ({
    task
}) => {
    const { toggleModal } = useModal<UpdateTaskModal>(appModals['UpdateTask']);
    const setTask = useTaskStore((state) => state.setTask);

    const toastSuccess = () => {
        Toast.show({
            type: 'success',
            text1: `Success`,
            text2: `Task deleted!`
        });
    }

    const deleteTask = useDeleteTask(toastSuccess);
    const deleteTaskOnSubmit = () => { 
        Alert.alert('Delete', 'Are you sure you want to delete this task?', [
            { text: "Yes", onPress: () => deleteTask.mutate(task) },
            { text: "No" }
        ]); 
    }

    const handleSelect = (item: { label: string, value: string }) => {
        switch (item.value) {
            case 'delete': {
                deleteTaskOnSubmit();
                break;
            }
            case 'update': {
                setTask(task);
                toggleModal();
                break;
            }
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
        backgroundColor: material_colors.red.accent4,
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
        // backgroundColor: 'transparent'
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