import React from 'react';
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';

import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import colors, { material_colors } from './colors';




const toastConfig = {
    success: (props: any) => (
        <BaseToast
            {...props}
            style={[styles.base, styles.success]}
            text1Style={styles.text1Style}
            text2Style={styles.text2Style}
        />
    ),

    error: (props: any) => (
        <ErrorToast
            {...props}
            style={[styles.base, styles.error]}
            text1Style={styles.text1Style}
            text2Style={styles.text2Style}
        />
    )
};




const styles = StyleSheet.create({
    base: {
        backgroundColor: material_colors.grey.darken4,
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowColor: material_colors.shades.black,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5
    },

    text1Style: {
        fontFamily: 'Inter-Bold',
        fontSize: 18,
        color: material_colors.grey.lighten3
    },

    text2Style: {
        fontFamily: 'Inter-Regular',
        fontSize: 12
    },
    
    success: {
        borderLeftColor: material_colors.green.accent3,
    },

    error: {
        borderLeftColor: material_colors.red.accent3,
    },
});




export default toastConfig;