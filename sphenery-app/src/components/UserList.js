import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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
                        AuthKey: process.env.REACT_APP_AUTH_KEY,
                        'Accept': 'text/plain',
                        'Content-Type': 'application/json'
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
        <Container>
            <Title>Users</Title>
            {users.map(user => (
                <User key={user.id}>{user.email}</User>
            ))}
        </Container>
    );
}

export default UserList;
