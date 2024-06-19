import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";

import AppText from "./AppText";
import colors from "../config/colors";
import AppIcon from "./AppIcon";




type TaskCardProps = {
    title: string;
    deadline: number;
    priority: number;
    executionTime: number;
    editable: boolean;
    onPress: () => void;
    onDelete: () => void;
};


const TaskCard: React.FC<TaskCardProps> = ({title, deadline, priority, executionTime, editable, onPress, onDelete}) => {
    const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);

    const toggleDeleteButton = () => {
        setDeleteButtonVisible(!deleteButtonVisible);
    };

    const handlePress = () => {
        Alert.alert('Warning', 'Are you sure you want to delete this task?', [
            { text: "Yes", onPress: () => handleDelete() },
            { text: "No" },
        ]);
    };

    const handleDelete = async () => {
        try {
            await onDelete();
        } catch (error) {
            Alert.alert('Error', 'An unexpected error occured while attempting to delete task.');
        }
    };


    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            onLongPress={() => {
                if (editable) toggleDeleteButton();
            }}
        >
            <View style={styles.detailsContainer}>
                <AppText passedStyle={styles.title} text={title} />
                <AppText passedStyle={styles.subTitle} text={`Deadline: ${deadline}`} />
                <AppText passedStyle={styles.subTitle} text={`Priority: ${priority}`} />
                <AppText passedStyle={styles.subTitle} text={`Execution Time: ${executionTime}`} />
            </View>

            { deleteButtonVisible &&
                <TouchableOpacity onPress={handlePress} style={styles.deleteButton}>
                    {/* <AppIcon name='window-close' iconColor={colors.black} /> */}
                </TouchableOpacity>
            }
        </TouchableOpacity>
    );
}





const styles = StyleSheet.create({
    card: {
        width: '100%',
        padding: 15,
        borderRadius: 15,
        marginVertical: '5%',
        backgroundColor: colors.O8DP,
    },
    detailsContainer: {
        justifyContent: 'center',
        borderLeftWidth: 5,
        borderLeftColor: colors.pink_dark,
        paddingLeft: 10
    },
    subTitle: {
        fontFamily: 'Inter-Light',
        color: colors.mild
    },
    title: {
        fontFamily: 'Inter-Bold',
        color: colors.light,
    },
    deleteButton: {
        width: 40,
        height: 40,
        position: 'absolute',
        right: -10,
        top: -10,
    }
});


export default TaskCard;

