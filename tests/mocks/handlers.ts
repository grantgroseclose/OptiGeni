import { http, HttpResponse } from 'msw'
import { tasks } from './tasks'
import { Task } from '../../types/data/Task';
import generateUniqueId from '../../utility/generateUniqueId';
import { categories } from './categories';
import { Category } from '../../types/data/Category';
import { Status } from '../../types/data/Status';




const taskUId = generateUniqueId();

const testAddedTask: Task = {
    title: 'task4title',
    deadline: new Date('2024-09-01T00:00:00.005+00:00').toISOString(),
    categoryId: 'task4categoryId',
    categoryTitle: 'task4categoryTitle',
    description: 'task4description',
    status: 'In-progress'
}

export const newTask = { ...testAddedTask, uId: taskUId };

export const taskToUpdate = tasks[0];
export const updatedTask: Task = { ...taskToUpdate, 'status': 'In-progress' as Status };



const categoryUId = generateUniqueId();

const testAddedCategory: Category = {
    userId: '0123456789101',
    title: 'newCategory',
    color: 'blue'
}

export const newCategory = { ...testAddedCategory, uId: categoryUId };






export const handlers = [
    http.get(
        'http://192.168.1.84:3000/api/tasks',
        () => {
            return HttpResponse.json(tasks)
        }
    )
]






export const taskHandlers = [
    http.get(
        'http://192.168.1.84:3000/api/tasks',
        () => {
            return HttpResponse.json(tasks)
        }
    ),
    http.post(
        'http://192.168.1.84:3000/api/tasks',
        () => {
            return HttpResponse.json(newTask)
        }
    ),
    http.post(
        'http://192.168.1.84:3000/api/task',
        () => {
            return HttpResponse.json(updatedTask)
        }
    ),
    // http.post(
    //     'http://192.168.1.84:3000/api/task',
    //     () => {
    //         return HttpResponse.json(deletedTask)
    //     }
    // )
]


export const taskErrorHandlers = [
    http.get(
        'http://192.168.1.84:3000/api/tasks',
        () => {
            return HttpResponse.json({ error: 'An unexpected error has occured fetching tasks.' });
        }
    )
]






export const categoryHandlers = [
    http.get(
        'http://192.168.1.84:3000/api/categories',
        () => {
            return HttpResponse.json(categories)
        }
    ),
    http.post(
        'http://192.168.1.84:3000/api/categories',
        () => {
            return HttpResponse.json(newCategory)
        }
    )
]


export const categoryErrorHandlers = [
    http.get(
        'http://192.168.1.84:3000/api/categories',
        () => {
            return HttpResponse.json({ error: 'An unexpected error has occured fetching categories.' });
        }
    )
]