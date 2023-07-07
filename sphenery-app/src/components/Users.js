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

        setError(null);

        const getUsers = async () => {
            try {
                const response = await axios.get('https://sphenery.com/users', {token: token.accessToken.token }, {
                    headers: {
                        Authorization: `Bearer ${token.accessToken}`,
                    }
                });
                setUsers(response.data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    refreshAccessToken();
                } else {
                    setError('Failed: ' + error.response.data.message);
                }
            }
        };

        const refreshAccessToken = async () => {
            try {
                const response = await axios.post('https://sphenery.com/auth/login-refresh', { token: token.accessToken}, {
                    headers: {
                        AuthKey: process.env.REACT_APP_AUTH_KEY
                    }
                });
                setToken(response.data);
            } catch (error) {
                setError('Login failed: '  + error.response.data.message);
            }
        };

        getUsers();
    }, [token, setToken]);

    return (
        <Container>
            <Title>Users</Title>
            {users.map(user => (
                <User key={user.id}>{user.email}</User>
            ))}
            {error && <Toast message={error} />}
        </Container>
    );
}

export default UserList;
