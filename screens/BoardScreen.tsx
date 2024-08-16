import React from 'react';
import { StyleSheet } from 'react-native';
import { RootTabParamList } from '../navigation/AppNavigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import Screen from '../components/Screen';
import AppButton from '../components/AppButton';
import { useAuthStore } from '../store/auth';
import AppText from '../components/AppText';
import colors, { material_colors } from '../config/colors';




type BoardScreenProps = BottomTabScreenProps<RootTabParamList, 'Board'>;


const BoardScreen: React.FC<BoardScreenProps> = ({navigation}) => {

    return (
        <Screen passedStyle={styles.container}>
            <AppText passedStyle={{color: material_colors.amber.amber, fontSize: 72}} text={'Board'} />
        </Screen>
    );
}




const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});
 

export default BoardScreen;

