import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TaskDetails from './pages/TaskDetails';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import CallbackPage from './pages/CallbackPage';
import ProtectedPage from './pages/ProtectedPage';
import ProfilePage from './pages/ProfilePage';
import AuthenticationGuard from './AuthenticationGuard';
import { TaskProvider } from './context/TaskContext';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

const App: React.FC = () => {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  return (
    <TaskProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={
            <AuthenticationGuard>
              <ProfilePage />
            </AuthenticationGuard>
          }
        />
        <Route
          path="/protected"
          element={
            <AuthenticationGuard>
              <ProtectedPage />
            </AuthenticationGuard>
          }
        />
        <Route path="/callback" element={<CallbackPage />} />

        {/* Task-related routes (protected) */}
        <Route
          path="/dashboard"
          element={
            <AuthenticationGuard>
              <Dashboard />
            </AuthenticationGuard>
          }
        />
        <Route
          path="/create"
          element={
            <AuthenticationGuard>
              <CreateTask />
            </AuthenticationGuard>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <AuthenticationGuard>
              <EditTask />
            </AuthenticationGuard>
          }
        />
        <Route
          path="/details/:id"
          element={
            <AuthenticationGuard>
              <TaskDetails />
            </AuthenticationGuard>
          }
        />
      </Routes>
    </TaskProvider>
  );
};

export default App;