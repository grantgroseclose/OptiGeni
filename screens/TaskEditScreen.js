import React, { useState } from "react";
import { StyleSheet, Alert } from "react-native";
import * as Yup from "yup";

import {
  AppForm,
  AppFormField,
  AppSubmitButton,
} from "../components/forms";

import useApi from "../hooks/useApi";
import tasksAPI from "../api/tasks";

import Screen from "../components/Screen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  deadline: Yup.number().required().min(1).max(10000).label("Deadline"),
  priority: Yup.number().required().min(1).max(10000).label("Priority"),
  executionTime: Yup.number().required().min(1).max(10000).label("Execution Time")
});




const TaskEditScreen = () => {
  const [taskPost, taskPostFailed] = useState(false);


  const handleSubmit = async (task, { resetForm }) => {
    const result = await tasksAPI.addTask(
      { ...task }
    );

    if (!result.ok) {
      Alert.alert('Error', result.data.error);
      return taskPostFailed(true);
    }
    taskPostFailed(false);

    Alert.alert('Success!', 'Task added!', [
        { text: "Ok" }
    ]);
    resetForm();
  };


  return (
    <Screen style={styles.container}>
      <AppForm
        style={styles.form_container}
        initialValues={{
          title: '',
          deadline: '',
          priority: '',
          executionTime: ''
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize='none'
          autoCorrect={false}
          name="title"
          placeholder="Title"
          width={'100%'}
        />
        <AppFormField
          keyboardType="numeric"
          maxLength={8}
          name="deadline"
          placeholder="Deadline"
          width={'100%'}
        />
        <AppFormField
          keyboardType="numeric"
          maxLength={8}
          name="priority"
          placeholder="Priority"
          width={'100%'}
        />
        <AppFormField
          keyboardType="numeric"
          maxLength={8}
          name="executionTime"
          placeholder="Execution Time"
          width={'100%'}
        />
        <AppSubmitButton title="Add Task" />
      </AppForm>
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

