import React, { ReactNode } from 'react';
import { SafeAreaView, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import colors from '../config/colors'




type ScreenProps = {
    passedStyle: StyleProp<ViewStyle>;
    children: ReactNode;
};


const Screen: React.FC<ScreenProps> = ({ passedStyle, children }) => {
    return <SafeAreaView style={[styles.screen, passedStyle]}>{children}</SafeAreaView>
}




const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.dark,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default Screen;

