import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Toast from './Toast';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 2rem;
    max-width: 600px;
`;

const Title = styled.h1`
    color: #333;
    font-size: 2.5rem;
`;

const User = styled.p`
    background: #f4f4f4;
    color: #333;
    padding: 1rem;
    margin: 0.5rem 0;
    border-radius: 5px;
    font-size: 1.2rem;
`;

function UserList({ token, setToken }) {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

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
                    setError('Login failed: ' + error.response.data + ' ' +error.response.data.message);
                }
            }
        };

        const refreshAccessToken = async () => {
            try {
                const response = await axios.post('https://sphenery.com/login-refresh', {}, {
                    headers: {
                        AuthKey: process.env.REACT_APP_AUTH_KEY,
                        'Accept': 'text/plain',
                        'Content-Type': 'application/json'
                    }
                });
                setToken(response.data.token);
            } catch (error) {
                setError('Login failed: ' + error.response.data + ' ' +error.response.data.message);
            }
        };

        getUsers();
    }, [token, setToken]);

    return (
        <Container>
            <Title>Users</Title>
            {error && <Toast message={error} />}
            {users.map(user => (
                <User key={user.id}>{user.email}</User>
            ))}
        </Container>
    );
}

export default UserList;
