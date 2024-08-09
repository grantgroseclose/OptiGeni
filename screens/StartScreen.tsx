import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { RootStackParamList } from '../navigation/AuthNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { screenHeight, screenWidth } from '../config/dimensions';
import colors from '../config/colors';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';




type StartScreenProps = NativeStackScreenProps<RootStackParamList, 'Start'>;


const StartScreen: React.FC<StartScreenProps> = ({navigation}) => {
    return (
        <Screen passedStyle={styles.container}>
            <View style={styles.logoContainer}>
                <AppText passedStyle={styles.logoText} text={"OptiGeni"} />
            </View>

            <View style={styles.buttonsContainer}>
                <AppButton title="Login" onPress={() => navigation.navigate('Login')} />
                <AppButton title="Register" onPress={() => navigation.navigate('Register')} />
            </View>

            <StatusBar barStyle='dark-content'></StatusBar>
        </Screen>
    );
}




const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    logoContainer: {
        padding: screenWidth * .05,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontFamily: 'Inter-Black',
        fontSize: screenHeight * .05,
        fontWeight: 'bold',
        color: colors.white
    },
    buttonsContainer: {
        padding: screenWidth * .05,
        width: '100%'
    }
});
 

export default StartScreen;

