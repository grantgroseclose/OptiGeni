import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";

import AppText from "./AppText";
import colors, { material_colors } from "../config/colors";
import AppIcon from "./AppIcon";
import { TaskStatus } from "../types/data/Task";

import Svg, { Circle } from 'react-native-svg';




type TaskCardProps = {
    categoryColor: () => string;
    title: string;
    description: string;
    deadline: number;
    priority: number;
    executionTime: number;
    status: TaskStatus;
    editable: boolean;
    onPress: () => void;
    onDelete: () => void;
};


const TaskCard: React.FC<TaskCardProps> = ({categoryColor, title, description, deadline, priority, executionTime, status, editable, onPress, onDelete}) => {
    const cat_color: string = categoryColor() as string;

    const statusColor = () => {
        switch (status) {
            case 'Not started': {
                return material_colors.red.accent4
            }
            case 'In-progress': {
                return material_colors.yellow.accent3;
            }
            case 'Complete': {
                return material_colors.green.accent3;
            }
        }
    }

    const status_color = statusColor();

    return (
        <View
            style={styles.card}
            // onPress={onPress}
        >
            <View style={[styles.detailsOuterContainer, { borderLeftColor: cat_color }]}>
                <View style={styles.detailsInnerContainer}>
                    <View>
                        <AppText passedStyle={styles.title} text={title} />
                        <AppText passedStyle={styles.desc} text={`Due in ${deadline} days`} />
                    </View>
                    
                    <AppIcon name='dots-horizontal' iconColor={material_colors.grey.darken1} size={40} backgroundColor={'transparent'} align='flex-start' justify='flex-start' />
                </View>

                <View style={{ flexDirection: 'row', alignSelf: "flex-end", alignItems: 'center' }}>
                    <Svg height="16" width="16" style={{
                        shadowOffset: {
                            width: 0,
                            height: 1
                        },
                        shadowColor: status_color,
                        shadowOpacity: .5,
                        shadowRadius: 5,
                        elevation: 5
                    }}>
                        <Circle cx="8" cy="8" r="8" fill={status_color} />
                    </Svg>
                    <AppText passedStyle={styles.status} text={status} />
                </View>
            </View>
        </View>
    );
}





const styles = StyleSheet.create({
    card: {
        width: '100%',
        padding: 15,
        borderRadius: 15,
        marginVertical: '2.5%',
        backgroundColor: colors.O4DP,
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowColor: material_colors.shades.black,
        shadowOpacity: .75,
        shadowRadius: 5,
        elevation: 5
    },
    detailsOuterContainer: {
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5,
        borderLeftWidth: 5,
        paddingLeft: 10,
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowColor: material_colors.shades.black,
        shadowOpacity: .625,
        shadowRadius: 5,
        elevation: 5
    },
    detailsInnerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24
    },
    title: {
        fontFamily: 'Inter-Light',
        color: material_colors.grey.lighten2,
        marginBottom: 4
    },
    desc: {
        fontFamily: 'Inter',
        color: material_colors.grey.darken1,
    },
    status: {
        fontFamily: 'Inter-Light',
        color: material_colors.grey.darken2,
        marginLeft: 8
    }
});


export default TaskCard;

