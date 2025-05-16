import { useAuth0 } from "@auth0/auth0-react";

const LoginButton: React.FC = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    const handleLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: "/profile",
            },
            authorizationParams: {
                prompt: "login",
            },
        });
    };

    if (isAuthenticated) return null;
    return <button onClick={handleLogin}>Log In</button>;
    return null;
};

export default LoginButton;