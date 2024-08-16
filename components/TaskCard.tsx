import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";

import AppText from "./AppText";
import colors, { material_colors } from "../config/colors";
import AppIcon from "./AppIcon";




type TaskCardProps = {
    category_color: () => string;
    title: string;
    description: string;
    deadline: number;
    priority: number;
    executionTime: number;
    editable: boolean;
    onPress: () => void;
    onDelete: () => void;
};


const TaskCard: React.FC<TaskCardProps> = ({category_color, title, description, deadline, priority, executionTime, editable, onPress, onDelete}) => {
    const cat_color: string = category_color() as string;

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
        >
            <View style={[styles.detailsContainer, { borderLeftColor: cat_color }]}>
                <AppText passedStyle={styles.title} text={title} />
                {/* <AppText passedStyle={styles.subTitle} text={description} /> */}
                <AppText passedStyle={styles.subTitle} text={`Due in ${deadline} days`} />
                {/* <AppText passedStyle={styles.subTitle} text={`Priority: ${priority}`} />
                <AppText passedStyle={styles.subTitle} text={`Execution Time: ${executionTime}`} /> */}
            </View>
        </TouchableOpacity>
    );
}





const styles = StyleSheet.create({
    card: {
        width: '100%',
        padding: 15,
        borderRadius: 15,
        marginVertical: '5%',
        backgroundColor: colors.O4DP,
    },
    detailsContainer: {
        justifyContent: 'center',
        borderLeftWidth: 5,
        paddingLeft: 10
    },
    subTitle: {
        fontFamily: 'Inter-Light',
        color: colors.mild
    },
    title: {
        fontFamily: 'Inter-Medium',
        color: colors.light,
    }
});


export default TaskCard;

