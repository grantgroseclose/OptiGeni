import React from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';




type AppTextProps = {
    passedStyle: StyleProp<TextStyle>;
    text: string;
};


const AppText: React.FC<AppTextProps> = ({ passedStyle, text }) => {
    return (
        <Text style={[styles.text, passedStyle]}>{text}</Text>
    );
}




const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontFamily: 'Inter-Regular',
        color: 'white'
    }
})


export default AppText;

