import React, { useState } from "react";
import { Dimensions, View, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";

import AppText from "./AppText";
import colors from "../config/colors";
import AppIcon from "./AppIcon";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;




const TaskCard = ({title, deadline, priority, executionTime, editable, onPress, onDelete}) => {
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
                <AppText passedStyle={styles.title}>{title}</AppText>
                <AppText passedStyle={styles.subTitle}>Deadline: {deadline}</AppText>
                <AppText passedStyle={styles.subTitle}>Priority: {priority}</AppText>
                <AppText passedStyle={styles.subTitle}>Execution Time: {executionTime}</AppText>
            </View>

            { deleteButtonVisible &&
                <TouchableOpacity onPress={handlePress} style={styles.deleteButton}>
                    <AppIcon name='window-close' iconColor={colors.black} />
                </TouchableOpacity>
            }
        </TouchableOpacity>
    );
}





const styles = StyleSheet.create({
    card: {
        width: screenWidth * 0.85,
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

