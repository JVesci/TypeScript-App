import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const CallbackPage: React.FC = () => {
    const { isLoading, error, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isLoading, isAuthenticated, navigate]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Authentication Error: {error.message}</div>;

    return <div>Redirecting...</div>;
};

export default CallbackPage;