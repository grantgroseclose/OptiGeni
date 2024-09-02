import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { RootTabParamList } from '../navigation/AppNavigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import colors from '../config/colors';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import useCategories from '../hooks/useCategories';
import useTasks from '../hooks/useTasks';
import CategoryFilterCard from '../components/card/CategoryFilterCard';
import TaskCard from '../components/card/TaskCard';
import { Category } from '../types/data/Category';
import { Task } from '../types/data/Task';
import Toast from 'react-native-toast-message';




type HomeScreenProps = BottomTabScreenProps<RootTabParamList, 'Home'>;


const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
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
    }

    if (taskQuery.isError) {
        toastError(taskQuery.error.message);
    }

    const getTaskCategory = (taskCatTitle: string): Category => {
        if (!categoryQuery.isLoading && categoryQuery !== undefined && categoryQuery.data !== undefined) {
            const cat: Category = categoryQuery.data.find(cat => taskCatTitle === cat.title) as Category;
    
            return cat as Category;
        }

        return {} as Category;
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
        <Screen passedStyle={{}}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingVertical: '5%'}}>
                <View style={styles.headerTextContainer}>
                    <AppText passedStyle={styles.headerText} text={'Category'} />
                </View>
                <View style={{paddingVertical: '1.25%'}}>
                    <View>
                    { categoryQuery.isLoading ? <ActivityIndicator size='large' color={colors.blue} /> :
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: '5%', paddingVertical: '1.25%'}}>
                        { Array.isArray(categoryQuery.data) && categoryQuery.data?.map((cat, index) =>
                            <CategoryFilterCard
                                key={index}
                                title={cat.title}
                                color={cat.color}
                            />
                        )}
                        </ScrollView>
                    }
                    </View>
                </View>


                <View style={styles.headerTextContainer}>
                    <AppText passedStyle={styles.headerText} text={'My Tasks'} />
                </View>
                <View style={{alignItems: 'center', justifyContent: 'center', paddingHorizontal: '5%'}}>
                    <View style={{width: '100%'}}>
                    { taskQuery.isLoading ? <ActivityIndicator size='large' color={colors.blue} /> :
                        <>{ Array.isArray(taskQuery.data) && taskQuery.data?.map((task, index) => 
                            renderTaskCard(index, task)
                        )}</>
                    }
                    </View>
                </View>
            </ScrollView>
        </Screen>
    );
}




const styles = StyleSheet.create({
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        marginBottom: '2.5%'
    },
    headerTextContainer: {
        paddingHorizontal: '5%',
        paddingVertical: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start'
    },
    headerText: {
        fontFamily: 'Inter-Bold',
        color: colors.light,
        fontSize: 24,
    },
    secondaryHeaderText: {
        fontFamily: 'Inter-Medium',
        color: colors.medium,
        fontSize: 14,
    },
    cardDetails: {
        fontFamily: 'Inter-Bold',
        fontSize: 14,
        color: colors.light,
    }
});
 

export default HomeScreen;

