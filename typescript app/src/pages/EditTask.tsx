// src/pages/EditTask.tsx
import React, { useContext, useState, useEffect } from 'react';
import { TaskContext } from '../context/TaskContext';
import { useParams, useNavigate } from 'react-router-dom';

const EditTask: React.FC = () => {
    const { id } = useParams();
    const taskContext = useContext(TaskContext);
    const navigate = useNavigate();

    if (!taskContext) {
        return <div>Loading...</div>;
    }

    const { tasks, updateTask } = taskContext;

    const task = tasks.find((t) => t.id === id);

    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [status, setStatus] = useState<'pending' | 'in-progress' | 'complete'>(task?.status || 'pending');

    useEffect(() => {
        if (!task) {
            navigate('/dashboard');
        }
    }, [task, navigate]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (task) {
            updateTask({ ...task, title, description, status });
            navigate('/dashboard');
        }
    };

    return (
        <div className="app-container">
            <h1>Edit Task</h1>
            <form onSubmit={handleSubmit}>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <select value={status} onChange={(e) => setStatus(e.target.value as 'pending' | 'in-progress' | 'complete')}>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="complete">Complete</option>
                </select>
                <button type="submit">
                    Update Task
                </button>
            </form>
        </div>
    );
};

export default EditTask;