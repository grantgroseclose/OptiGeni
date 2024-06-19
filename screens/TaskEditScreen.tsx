import React from "react";
import { StyleSheet } from "react-native";
import { RootTabParamList } from '../navigation/AppNavigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import * as Yup from "yup";

import Screen from "../components/Screen";
import AppText from '../components/AppText';

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  deadline: Yup.number().required().min(1).max(10000).label("Deadline"),
  priority: Yup.number().required().min(1).max(10000).label("Priority"),
  executionTime: Yup.number().required().min(1).max(10000).label("Execution Time")
});




type TaskEditScreenProps = BottomTabScreenProps<RootTabParamList, 'TaskEdit'>;


const TaskEditScreen: React.FC<TaskEditScreenProps> = () => {


  return (
    <Screen passedStyle={styles.container}>
      <AppText passedStyle={{fontSize: 72}} text='TASK MODIFICATION FUNCTIONALITY'/>
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


export default TaskEditScreen;

