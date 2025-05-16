import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';
import type { Task } from '../types/Task';

const TaskDetails: React.FC = () => {
    const { id } = useParams(); // Get task ID from URL params
    const taskContext = useContext(TaskContext); // Access tasks and updateTask function
    if (!taskContext) {
        throw new Error('TaskContext is undefined. Make sure TaskContextProvider is wrapping this component.');
    }
    const { tasks, updateTask } = taskContext;
    const navigate = useNavigate(); // For navigation

    // Find the task from the global state using the task ID
    const task = tasks.find((task) => task.id === id);

    // State to hold edited task values
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [status, setStatus] = useState(task?.status || 'pending');

    // If task is not found, redirect to dashboard
    useEffect(() => {
        if (!task) {
            navigate('/dashboard');
        }
    }, [task, navigate]);

    // Handle form submission to save changes
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (task) {
            const updatedTask: Task = {
                ...task,
                title,
                description,
                status,
            };
            updateTask(updatedTask); // Update the task in global state
            navigate('/dashboard'); // Redirect to the dashboard after saving
        }
    };

    return (
        <div className="app-container">
            {task ? (
                <>
                    <h1>Task Details</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Task Title"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Task Description"
                            />
                        </div>

                        <div className="form-group">
                            <label>Status</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value as 'pending' | 'in-progress' | 'complete')}>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="complete">Complete</option>
                            </select>
                        </div>

                        <button type="submit" className="btn-save">
                            Save Changes
                        </button>
                    </form>

                    <button onClick={() => navigate('/dashboard')} className="btn-cancel">
                        Cancel
                    </button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default TaskDetails;