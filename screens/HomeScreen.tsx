import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
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
import CategoryFilterCard from '../components/CategoryFilterCard';
import TaskCard from '../components/TaskCard';
import { Category } from '../types/data/Category';




type HomeScreenProps = BottomTabScreenProps<RootTabParamList, 'Home'>;


const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
    // TODO: Fix undefined color bug
    const categoryQuery = useCategories();
    const taskQuery = useTasks();


    const getCategoryColor = (taskCatTitle: string) => {
        if (!categoryQuery.isLoading && categoryQuery !== undefined && categoryQuery.data !== undefined) {
            const cat: Category = categoryQuery.data.find(cat => taskCatTitle === cat.title) as Category;
    
            return cat.color as string;
        }

        return material_colors.blue.blue;
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
                            { categoryQuery?.data &&
                            categoryQuery.data.map((cat, index) =>
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
                            <>{ taskQuery?.data &&
                            taskQuery.data.map((task, index) =>
                                <TaskCard
                                    key={index}
                                    title={task.title}
                                    categoryColor={() => getCategoryColor(task.categoryTitle)}
                                    description={task.description}
                                    deadline={task.deadline}
                                    priority={task.priority}
                                    executionTime={task.executionTime}
                                    status={task.status ? task.status : 'Not started'}
                                    editable
                                    onPress={() => console.log('Pressed')}
                                    // onDelete={() => handleDelete(task)}
                                    onDelete={() => { return; }}
                                />
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

