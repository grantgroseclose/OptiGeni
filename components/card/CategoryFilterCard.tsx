import React from "react";
import { 
    View, 
    StyleSheet, 
    TouchableOpacity, 
} from "react-native";

import AppText from "../AppText";
import colors, { material_colors } from "../../config/colors";
import { 
    screenHeight, 
    screenWidth
} from "../../config/dimensions";
import { useCategoryStore } from "../../store/homeCategory";




type CategoryFilterCardProps = {
    title: string;
    color: string;
    handlePress: () => void;
};


const CategoryFilterCard: React.FC<CategoryFilterCardProps> = ({
    title,
    color,
    handlePress
}) => {
    const categoryFilter = useCategoryStore((state) => state.categoryFilter);
    const fontColor = title === categoryFilter?.title ? material_colors.grey.lighten2 : material_colors.grey.darken3;


    return (
        <View style={[styles.cardContainer, { backgroundColor: color }]}>
            <TouchableOpacity style={[styles.card]} onPress={handlePress}>
                <View style={styles.detailsContainer}>
                    <AppText passedStyle={[styles.title, { color: fontColor }]} text={title} />
                </View>
            </TouchableOpacity>
        </View>
    );
};








const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 15,
        height: screenWidth * 0.265,
        width: screenWidth * 0.265,
        marginHorizontal: screenWidth * .025,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        backgroundColor: colors.dark,
        width: screenWidth * 0.25,
        height: screenWidth * 0.25,
        borderRadius: 15,
        marginLeft: screenWidth * .025,
        marginRight: screenWidth * .025,
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowColor: material_colors.shades.black,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5
    },
    detailsContainer: {
        flex: 1,
        paddingHorizontal: '5%',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Inter-Medium',
        alignSelf: 'center'
    }
});


export default CategoryFilterCard;