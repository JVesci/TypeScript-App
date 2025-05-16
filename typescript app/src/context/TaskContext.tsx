import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Task } from '../types/Task';

interface TaskContextType {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    deleteTask: (id: string) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const addTask = (task: Task) => setTasks((prev) => [...prev, task]);

    const updateTask = (updatedTask: Task) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
    };

    const deleteTask = (id: string) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };


    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};