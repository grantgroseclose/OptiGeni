import APIClient from "./APIClient";

export type Task = {
    title: string;
    deadline: number;
    priority: number;
    executionTime: number;
};




export default new APIClient<Task, Task>('/tasks');

