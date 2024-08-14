import React from 'react';
import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { RootTabParamList } from '../navigation/AppNavigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { screenWidth, screenHeight } from '../config/dimensions'

import colors from '../config/colors';
import Screen from '../components/Screen';

import useTasks from '../hooks/useTasks';

import TaskCard from '../components/TaskCard';




// type ListScreenProps = BottomTabScreenProps<RootTabParamList, 'List'>;


// const ListScreen: React.FC<ListScreenProps> = ({navigation}) => {
//     const { data: tasks, error, isLoading } = useTasks();


//     return (
//         <Screen passedStyle={styles.container}>
//         { isLoading ? <ActivityIndicator size='large' color={colors.blue} /> :
//             <ScrollView 
//                 contentContainerStyle={{padding: '5%', width: screenWidth}}
//             >

//             { tasks &&
//                 tasks.map((task, index) =>
//                     <TaskCard
//                         key={index}
//                         title={task.title}
//                         deadline={task.deadline}
//                         priority={task.priority}
//                         executionTime={task.executionTime}
//                         editable
//                         onPress={() => console.log('Pressed')}
//                         // onDelete={() => handleDelete(task)}
//                         onDelete={() => { return; }}
//                     />
//                 )
//             }
//             </ScrollView>
//         }
//         </Screen>
//     );
// }




const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
});
 

// export default ListScreen;

