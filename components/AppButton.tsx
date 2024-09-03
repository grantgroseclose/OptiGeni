import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { screenWidth, screenHeight } from '../config/dimensions';

import colors, { material_colors } from '../config/colors';




type AppButtonProps= {
    title: string;
    onPress: () => void;
    passedStyle?: object;
};


const AppButton: React.FC<AppButtonProps> = ({ title, onPress, passedStyle }) => {
    return (
        <TouchableOpacity style={[styles.button, passedStyle]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}




const styles = StyleSheet.create({
    button: {
        backgroundColor: material_colors.purple.accent4,
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowColor: material_colors.shades.black,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: '100%',
        marginVertical: screenHeight * .02
    },
    text: {
        color: colors.black,
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontFamily: 'Avenir'
    }
})


export default AppButton;
