import { useEffect, useState } from 'react';
import axios from 'axios';

interface UserData {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

const User = () => {
    const [user, setUser] = useState<UserData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const jwtToken = sessionStorage.getItem('jwtToken_key');

        const fetchUser = async () => {
            try {
                const response = await axios.get('https://reqres.in/api/users/4', {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });

                setUser(response.data.data);
            } catch (err) {
                setError('Failed to fetch user.');
                console.error('Error fetching user:', err);
            }
        };

        if (jwtToken) {
            fetchUser();
        } else {
            setError('No token found. Please log in.');
        }
    }, []);

    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    if (!user) return <p>Loading user info...</p>;

    return (
        <div>
            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
            <h3>{user.first_name} {user.last_name}</h3>
            <h4>
                <a href={`mailto:${user.email}`}>{user.email}</a>
            </h4>
        </div>
    );
};

export default User;