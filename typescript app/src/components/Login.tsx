import { useState } from 'react';
import axios from 'axios';
import User from './User';

const Login: React.FC = () => {
    const [email, setEmail] = useState('eve.holt@reqres.in');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('https://reqres.in/api/login', {
                email,
                password,
            });

            const jwtToken = response.data.token;
            setToken(jwtToken);
            sessionStorage.setItem('jwtToken_key', jwtToken);
        } catch (err: any) {
            setError('Login failed. Please check the credentials.');
            console.error('Login failed:', err);
        }
    };

    const logoutUser = () => {
        sessionStorage.clear();
        setToken('');
        setError('');
    };

    return (
        <div>
            <h2>Login</h2>
            <h4>Use email: <code>eve.holt@reqres.in</code></h4>
            <h5>Password can be anything</h5>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit">Login</button>
            </form>

            {token && (
                <>
                    <button onClick={logoutUser}>Logout</button>
                    <User />
                </>
            )}
        </div>
    );
};

export default Login;