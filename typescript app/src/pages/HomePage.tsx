import { Col, Container } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    const handleStart = () => {
        if (isAuthenticated) {
            navigate("/dashboard");
        } else {
            loginWithRedirect();
        }
    };

    return (
        <Container className="mt-5">
            <Col>
                <h1>Task Manager</h1>
                <p>
                    Welcome! This app helps you organize your tasks efficiently. You can:
                </p>
                <ul>
                    <li>Create new tasks with titles and descriptions</li>
                    <li>View your list of tasks on the Dashboard</li>
                    <li>Edit tasks to update their details or status</li>
                    <li>See detailed information about each task</li>
                </ul>
                <p><strong>To get started, please log in.</strong></p>
                <Button variant="primary" onClick={handleStart}>
                    {isAuthenticated ? "Go to Dashboard" : "Login to Start"}
                </Button>
            </Col>
        </Container>
    );
};

export default HomePage;