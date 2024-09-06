import { Task } from '../../types/data/Task'





export const tasks: Task[] = [
    {
        uId: 'task1uId',
        title: 'task1title',
        deadline: new Date('2024-09-01T00:00:00.005+00:00').toISOString(),
        categoryId: 'task1categoryId',
        categoryTitle: 'task1categoryTitle',
        description: 'task1description',
        status: 'Not started'
    },
    {
        uId: 'task2uId',
        title: 'task2title',
        deadline: new Date('2024-09-01T00:00:00.005+00:00').toISOString(),
        categoryId: 'task2categoryId',
        categoryTitle: 'task2categoryTitle',
        description: 'task2description',
        status: 'In-progress'
    },
    {
        uId: 'task1uId',
        title: 'task1title',
        deadline: new Date('2024-09-01T00:00:00.005+00:00').toISOString(),
        categoryId: 'task1categoryId',
        categoryTitle: 'task1categoryTitle',
        description: 'task1description',
        status: 'Not started'
    },
];