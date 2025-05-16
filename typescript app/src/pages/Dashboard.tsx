import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Link } from 'react-router-dom';
import '../App.css';

const Dashboard: React.FC = () => {
    const taskContext = useContext(TaskContext);

    if (!taskContext) {
        return <div className="app-container"><h1>Task Dashboard</h1><p>Loading...</p></div>;
    }

    const { tasks, deleteTask } = taskContext;

    return (
        <div className="app-container">
            <h1>Task Dashboard</h1>
            <Link to="/create">
                <button>Create New Task</button>
            </Link>

            {tasks.length === 0 ? (
                <p>No tasks yet. Start by creating one!</p>
            ) : (
                tasks.map((task) => (
                    <div className="task-card" key={task.id}>
                        <h2>{task.title}</h2>
                        <p>{task.description}</p>
                        <p>Status: {task.status}</p>

                        <Link to={`/details/${task.id}`}>
                            <button>View</button>
                        </Link>{' '}
                        <Link to={`/edit/${task.id}`}>
                            <button>Edit</button>
                        </Link>{' '}
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Dashboard;