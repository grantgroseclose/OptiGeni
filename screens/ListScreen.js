import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator, Alert } from 'react-native';

import colors from '../config/colors';
import Screen from '../components/Screen';

import useApi from '../hooks/useApi';
import tasksAPI from '../api/tasks';

import TaskCard from '../components/TaskCard';

import publicIP from 'react-native-public-ip';




const ListScreen = ({navigation}) => {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const getTasks = useApi(tasksAPI.getTasks);
    const deleteTask = useApi(tasksAPI.deleteTask);
    const [tasks, setTasks] = useState([]);
    const [task, deleteTaskFailed] = useState(false);

    useEffect(() => {
        const getTaskData = async () => {
            getTasks.request().then((res) => {
                setTasks(res['data']);
                setLoading(false);
                // console.log(res['data']);
            }).catch(err => {
                // console.log(err);
            });
        }

        getTaskData();
    }, []);

    const refreshTasks = async () => {
        setRefreshing(true);

        getTasks.request().then((res) => {
            setTasks(res['data']);
            setRefreshing(false);
            // console.log(res['data']);
        }).catch(err => {
            // console.log(err);
        });
    }

    const handleDelete = async (task) => {
        deleteTask.request(task).then((res) => {
            Alert.alert('Success!', 'Task removed.');
            deleteTaskFailed(false);
            refreshTasks();
        }).catch((err) => {
            Alert.alert('Error', err);
            return deleteTaskFailed(true);
        });
    };




    return (
        <Screen>
        { loading ? <ActivityIndicator size='large' color={colors.blue} /> :
            <ScrollView 
                contentContainerStyle={{padding: '5%'}}
                refreshing={refreshing}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={refreshTasks} tintColor={colors.blue}/>
                }
            >

            { tasks &&
                tasks.map((task, index) =>
                    <TaskCard
                        key={index}
                        title={task.title}
                        deadline={task.deadline}
                        priority={task.priority}
                        executionTime={task.executionTime}
                        editable
                        onPress={() => console.log('Pressed')}
                        onDelete={() => handleDelete(task)}
                    />
                )
            }
            </ScrollView>
        }
        </Screen>
    );
}




const styles = StyleSheet.create({
    
});
 

export default ListScreen;

