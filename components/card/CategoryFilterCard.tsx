import React, { useState } from "react";
import { 
    View, 
    StyleSheet, 
    TouchableOpacity, 
} from "react-native";

import AppText from "../AppText";
import colors from "../../config/colors";
import { 
    screenHeight, 
    screenWidth
} from "../../config/dimensions";




type CategoryFilterCardProps = {
    title: string;
    color: string;
};


const CategoryFilterCard: React.FC<CategoryFilterCardProps> = ({
    title,
    color
}) => {
    return (
        <TouchableOpacity style={[styles.card, { backgroundColor: color }]}>
            <View style={styles.detailsContainer}>
                <AppText passedStyle={styles.title} text={title} />
            </View>
        </TouchableOpacity>
    );
};




const styles = StyleSheet.create({
    card: {
        width: screenWidth * 0.235,
        height: screenHeight * 0.15,
        borderRadius: 15,
        marginLeft: screenWidth * .025,
        marginRight: screenWidth * .025
    },
    detailsContainer: {
        paddingHorizontal: '5%',
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'Inter-Bold',
        color: colors.primary,
    }
});


export default CategoryFilterCard;