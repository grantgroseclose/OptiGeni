import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { screenWidth, screenHeight } from '../config/dimensions';

import colors from '../config/colors';




type AppButtonProps= {
    title: string;
    onPress: () => void;
};


const AppButton: React.FC<AppButtonProps> = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}




const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.blue,
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
