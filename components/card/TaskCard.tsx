import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";

import AppText from "../AppText";
import colors, { material_colors } from "../../config/colors";
import AppIcon from "../AppIcon";
import { Status, statusColorMap } from "../../types/data/Status";

import Svg, { Circle } from 'react-native-svg';
import { Category } from "../../types/data/Category";
import CardModDropdown from "./CardModDropdown";





export type TaskCardProps = {
    category: Category;
    title: string;
    description: string;
    deadline: number;
    priority: number;
    executionTime: number;
    status: Status;
    editable: boolean;
};




const TaskCard: React.FC<TaskCardProps> = ({category, title, description, deadline, priority, executionTime, status, editable}) => {
    const statusCol = statusColorMap[status];

    
    return (
        <View
            style={styles.card}
        >
            <View style={[styles.detailsOuterContainer, { borderLeftColor: category.color }]}>
                <View style={styles.detailsInnerContainer}>
                    <View>
                        <AppText passedStyle={styles.title} text={title} />
                        <AppText passedStyle={styles.desc} text={`Due in ${deadline} days`} />
                    </View>
                    
                    <CardModDropdown />
                </View>

                <View style={{ flexDirection: 'row', alignSelf: "flex-end", alignItems: 'center' }}>
                    <Svg height="16" width="16" style={{
                        shadowOffset: {
                            width: 0,
                            height: 1
                        },
                        shadowColor: statusCol,
                        shadowOpacity: .5,
                        shadowRadius: 5,
                        elevation: 5
                    }}>
                        <Circle cx="8" cy="8" r="8" fill={statusCol} />
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
        shadowOpacity: 1,
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

