import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const NavBarButtons: React.FC = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    return (
        <div style={styles.container}>
            {!isAuthenticated ? (
                <button onClick={() => loginWithRedirect()} style={styles.button}>
                    Log In
                </button>
            ) : (
                <button
                    onClick={() =>
                        logout({ logoutParams: { returnTo: window.location.origin } })
                    }
                    style={styles.button}
                >
                    Log Out
                </button>
            )}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        marginTop: '20px',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#61dafb',
        border: 'none',
        padding: '10px 20px',
        fontSize: '14px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default NavBarButtons;