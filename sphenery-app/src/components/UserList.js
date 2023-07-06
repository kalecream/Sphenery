import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList({ token, setToken }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get('https://sphenery.com/users', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    refreshAccessToken();
                } else {
                    console.error(error);
                }
            }
        };

        const refreshAccessToken = async () => {
            try {
                const response = await axios.post('https://sphenery.com/refresh-token', {}, {
                    headers: {
                        AuthKey: process.env.AuthKey
                    }
                });
                setToken(response.data.token);
            } catch (error) {
                console.error(error);
            }
        };

        getUsers();
    }, [token, setToken]);

    return (
        <div>
            <h1>Users</h1>
            {users.map(user => (
                <p key={user.id}>{user.email}</p>
            ))}
        </div>
    );
}

export default UserList;
