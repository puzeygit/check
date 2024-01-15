import { StateCreator, create, State } from "zustand";
import  {generateId} from "../helper";
import {devtools} from 'zustand/middleware';
import { persist } from 'zustand/middleware';


export enum TaskStatus {
    fulfilled = 'fulfilled',
    inProgress = 'inProgress'
}
interface Task {
    id: string;
    title: string;
    createdAt: number;
    status: TaskStatus;
}
 
interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
    changeStatus: (id: string) => void;
}


export const useToDoStore = create<ToDoStore>()(persist(devtools((set, get) => ({
    tasks: [],
    createTask: (title: string) => {
        const {tasks} = get();
        const newTask = {
            id: generateId(),
            title,
            createdAt: Date.now(),
            status: TaskStatus.inProgress
        }
        set({
            tasks: [newTask].concat(tasks),
        })
    },
    updateTask: (id, title) => {
        const {tasks} = get();
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.title
            }))
        })
    },
    removeTask: (id) => {
        const  {tasks} = get();
        set({
            tasks: tasks.filter((task) => task.id !== id)
        })
    },
    changeStatus: (id) => {
        const  { tasks } = get();
        set({
            tasks: tasks.map((task) => task.id === id ? {...task, status: task.status === TaskStatus.inProgress ? TaskStatus.fulfilled : TaskStatus.inProgress} : task)
        })
    },
})),
    {
        name: 'checkListStorage',
    }

))