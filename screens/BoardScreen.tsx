import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { RootTabParamList } from '../navigation/AppNavigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import colors, { material_colors } from '../config/colors';
import Screen from '../components/Screen';
import { ScrollView } from 'react-native-gesture-handler';
import BoardStatusDropdown from '../components/BoardStatusDropdown';
import { Task } from '../types/data/Task';
import useCategories from '../hooks/useCategories';
import useTasks from '../hooks/useTasks';
import Toast from 'react-native-toast-message';
import { Category } from '../types/data/Category';
import TaskCard from '../components/card/TaskCard';
import { useBoardStore } from '../store/statusBoard';




type BoardScreenProps = BottomTabScreenProps<RootTabParamList, 'Board'>;


const BoardScreen: React.FC<BoardScreenProps> = ({navigation}) => {
    const { status } = useBoardStore();

    const categoryQuery = useCategories();
    const taskQuery = useTasks();

    const toastError = (err: string) => {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: err
        });
    }
    
    if (categoryQuery.isPending || taskQuery.isPending) {
        return (
            <Screen passedStyle={{}}>
                <ActivityIndicator size='large' color={colors.blue} />
            </Screen>
        );
    }

    if (categoryQuery.isError) {
        toastError(categoryQuery.error.message);
        return (
            <Screen passedStyle={{}}>
                <View></View>
            </Screen>
        );
    }

    if (taskQuery.isError) {
        toastError(taskQuery.error.message);
        return (
            <Screen passedStyle={{}}>
                <View></View>
            </Screen>
        );
    }

    const tasksFilteredByStatus = taskQuery?.data.filter((task: Task) => task.status === status);

    const getTaskCategory = (taskCatTitle: string): Category => {
        return categoryQuery.data?.find(cat => taskCatTitle === cat.title) as Category || {} as Category;
    }

    const renderTaskCard = (idx: number, task: Task) => {
        const category: Category = getTaskCategory(task.categoryTitle);

        return (
            <TaskCard
                key={idx}
                task={task}
                category={category}
            />
        );
    }
    

    return (
        <Screen passedStyle={styles.container}>
            <View style={styles.board}>
                <BoardStatusDropdown />
                <View style={styles.boardInnerContainer}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: '5%', paddingVertical: '1.25%'}}>
                        { Array.isArray(tasksFilteredByStatus) && tasksFilteredByStatus.map((task, index) => 
                            renderTaskCard(index, task)
                        )}
                    </ScrollView>
                </View>
            </View>
        </Screen>
    );
}




const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    board: {
        height: '80%',
        width: '85%',
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowColor: material_colors.shades.black,
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5
    },
    boardInnerContainer: {
        flex: 8,
        backgroundColor: material_colors.blue_grey.darken4,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15
    }
});
 

export default BoardScreen;

