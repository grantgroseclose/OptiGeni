import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "../AppText";
import colors, { material_colors } from "../../config/colors";
import AppIcon from "../AppIcon";
import { Status, statusColorMap } from "../../types/data/Status";

import Svg, { Circle } from 'react-native-svg';
import { Category } from "../../types/data/Category";
import CardModDropdown from "./CardModDropdown";
import { Task } from "../../types/data/Task";
import extractMonth from "../../utility/extractMonth";
import extractDay from "../../utility/extractDay";
import UpdateTaskStatusModal from "../modal/UpdateTaskStatusModal";





export type TaskCardProps = {
    task: Task;
    category: Category;
};




const TaskCard: React.FC<TaskCardProps> = ({ task, category }) => {
    const statusCol = statusColorMap[task.status as Status];
    
    const extractedISODate = new Date(task.deadline);
    const extractedDate = extractedISODate.getUTCDate().toString();
    const extractedDay = extractDay(extractedISODate.getUTCDay());
    const extractedMonth = extractMonth(extractedISODate.getUTCMonth());

    const dueDate = `${extractedDay}, ${extractedMonth} ${extractedDate}`;

    
    return (
        <View style={styles.card}>
            <View style={[styles.detailsOuterContainer, { borderLeftColor: category.color }]}>
                <View style={styles.detailsInnerContainer}>
                    <View>
                        <AppText passedStyle={styles.title} text={task.title} />

                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                             <AppText passedStyle={styles.desc} text={`${dueDate}`} />

                            <AppIcon name='calendar-month' size={50} align='flex-end' backgroundColor="transparent" iconColor={material_colors.grey.grey} />
                        </View>
                    </View>
                    
                    <UpdateTaskStatusModal />
                    <CardModDropdown task={task} />
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
                    <AppText passedStyle={styles.status} text={task.status as string} />
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
        backgroundColor: colors.modal,
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
        fontFamily: 'Inter-Regular',
        fontSize: 20,
        color: material_colors.grey.lighten2
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

