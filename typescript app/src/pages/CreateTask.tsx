// src/pages/CreateTask.tsx
import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const CreateTask: React.FC = () => {
    const taskContext = useContext(TaskContext);
    if (!taskContext) {
        throw new Error('TaskContext is undefined. Make sure your component is wrapped in a TaskContextProvider.');
    }
    const { addTask } = taskContext;
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<'pending' | 'in-progress' | 'complete'>('pending');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTask = {
            id: uuidv4(),
            title,
            description,
            status,
        };
        addTask(newTask);
        navigate('/dashboard'); // Redirect to Dashboard
    };

    return (
        <div className="app-container">
            <h1>Create Task</h1>
            <form onSubmit={handleSubmit}>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <select value={status} onChange={(e) => setStatus(e.target.value as 'pending' | 'in-progress' | 'complete')}>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="complete">Complete</option>
                </select>
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default CreateTask;