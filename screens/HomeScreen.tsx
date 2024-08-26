import React from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, View } from 'react-native';
import { RootTabParamList } from '../navigation/AppNavigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import colors, { material_colors } from '../config/colors';
import {
    screenHeight,
    screenWidth
} from '../config/dimensions';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import useCategories from '../hooks/useCategories';
import useTasks from '../hooks/useTasks';
import CategoryFilterCard from '../components/card/CategoryFilterCard';
import TaskCard from '../components/card/TaskCard';
import { Category } from '../types/data/Category';
import { Task } from '../types/data/Task';





type HomeScreenProps = BottomTabScreenProps<RootTabParamList, 'Home'>;


const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
    const categoryQuery = useCategories();
    const taskQuery = useTasks();

    // console.log(taskQuery.data);
    
    if (categoryQuery.isPending || taskQuery.isPending) {
        return (
            <Screen passedStyle={{}}>
                <ActivityIndicator size='large' color={colors.blue} />
            </Screen>
        );
    }

    if (categoryQuery.isError || taskQuery.isError) {
        return;
    }

    // taskQuery.data.forEach(task => console.log(task));

    const getTaskCategory = (taskCatTitle: string): Category => {
        if (!categoryQuery.isLoading && categoryQuery !== undefined && categoryQuery.data !== undefined) {
            const cat: Category = categoryQuery.data.find(cat => taskCatTitle === cat.title) as Category;
    
            return cat as Category;
        }

        return {} as Category;
    }

    const renderTaskCard = (index: number, task: Task) => {
        const cat = getTaskCategory(task.categoryTitle);

        return <TaskCard
            key={index}
            task={task}
            title={task.title}
            category={cat}
            description={task.description}
            deadline={task.deadline}
            priority={task.priority}
            executionTime={task.executionTime}
            status={task.status ? task.status : 'Not started'}
            editable
        />
    }


    return (
        <Screen passedStyle={{}}>
            {
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding: '5%'}}>

                    <View>
                        <View style={styles.headerTextContainer}>
                            <AppText passedStyle={styles.headerText} text={'Filter'} />
                        </View>

                        <View>
                        { categoryQuery.isLoading ? <ActivityIndicator size='large' color={colors.blue} /> :
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{padding: '5%'}}>
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




                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <View style={styles.headerTextContainer}>
                            <AppText passedStyle={styles.headerText} text={'Optimal'} />
                        </View>

                        <View style={{width: '100%'}}>
                        { taskQuery.isLoading ? <ActivityIndicator size='large' color={colors.blue} /> :
                            <>{ Array.isArray(taskQuery.data) && taskQuery.data?.map((task, index) => 
                                renderTaskCard(index, task)
                            )}</>
                        }
                        </View>
                    </View>

                </ScrollView>
            }
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
        paddingHorizontal: '2.5%',
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

