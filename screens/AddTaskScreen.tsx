import React from "react";
import { StyleSheet, View } from "react-native";
import { RootTabParamList } from '../navigation/AppNavigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import Screen from "../components/Screen";

import AddTaskForm from "../components/form/AddTaskForm";




type AddTaskScreenProps = BottomTabScreenProps<RootTabParamList, 'AddTask'>;


const AddTaskScreen: React.FC<AddTaskScreenProps> = () => {
    return (
        <Screen passedStyle={styles.container}>
            <View style={{width: '92.5%', alignSelf: 'center'}}>
                <AddTaskForm />
            </View>
        </Screen>
    );
}




const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  form_container: {
    padding: 15,
    width: '100%'
  }
});


export default AddTaskScreen;

