import APIClient from "./APIClient";

export interface Task {
    title: string;
    deadline: number;
    priority: number;
    executionTime: number;
}

export type TaskProps = {
    task: Task;
}




export default new APIClient<Task>('/tasks');
