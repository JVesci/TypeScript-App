import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const NavBar: React.FC = () => {
    const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();

    return (
        <nav style={styles.nav}>
            <h2 style={styles.logo}>
                <Link to="/" style={styles.link}>TaskManager</Link>
            </h2>
            <ul style={styles.menu}>
                <li><Link to="/" style={styles.link}>Home</Link></li>
                {isAuthenticated && (
                    <>
                        <li><Link to="/dashboard" style={styles.link}>Dashboard</Link></li>
                        <li><Link to="/create" style={styles.link}>Create Task</Link></li>
                        <li><Link to="/profile" style={styles.link}>Profile</Link></li>
                    </>
                )}
            </ul>
            <div>
                {!isLoading && !isAuthenticated && (
                    <button style={styles.button} onClick={() => loginWithRedirect()}>
                        Login
                    </button>
                )}
                {!isLoading && isAuthenticated && (
                    <button
                        style={styles.button}
                        onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#282c34',
        padding: '10px 20px',
    },
    logo: {
        margin: 0,
        color: '#fff',
    },
    menu: {
        display: 'flex',
        listStyle: 'none',
        gap: '15px',
        margin: 0,
        padding: 0,
    },
    link: {
        color: '#61dafb',
        textDecoration: 'none',
        fontSize: '16px',
    },
    button: {
        backgroundColor: '#61dafb',
        border: 'none',
        padding: '6px 12px',
        borderRadius: '4px',
        color: '#282c34',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
};

export default NavBar;