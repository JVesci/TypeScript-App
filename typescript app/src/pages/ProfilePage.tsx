import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PageLayout from "./PageLayout";
import { Col } from "react-bootstrap";

const ProfilePage: React.FC = () => {
    const {
        user,
        isAuthenticated,
        getAccessTokenSilently,
        isLoading,
        error,
    } = useAuth0();

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await getAccessTokenSilently();
                console.log("Access Token:", token);
            } catch (err) {
                console.error("Error fetching access token:", err);
            }
        };

        if (isAuthenticated) {
            fetchToken();
        }
    }, [isAuthenticated, getAccessTokenSilently]);

    if (isLoading) return <div>Loading...</div>;

    if (error) return <div>Authentication error: {error.message}</div>;

    if (!isAuthenticated) {
        return <div>Not authenticated</div>;
    }

    if (!user) {
        return <div>No user profile</div>;
    }

    return (
        <PageLayout>
            <h2>Profile Page</h2>
            <Col>
                {user.picture && (
                    <img
                        src={user.picture}
                        alt={user.name}
                        style={{ borderRadius: "50%", maxWidth: "150px" }}
                    />
                )}
                <h3>{user.name}</h3>
                <div>
                    {Object.entries(user).map(([key, value]) => (
                        <p key={key}>
                            <b>{key}</b>: {String(value)}
                        </p>
                    ))}
                </div>
            </Col>
        </PageLayout>
    );
};

export default ProfilePage;