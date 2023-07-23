import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Toast from './Toast';
import { useNavigate } from 'react-router-dom';
import { Tokens } from '../App';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 2rem;
    width: 800px;
    background-color: var(--black);
    border-radius: var(--border-radius);
`;

const Title = styled.h1`
    color: #fff;
    font-size: 2.5rem;
`;

const User = styled.div`
    background: #f4f4f4;
    color: #fff;
    padding: 1rem;
    margin: 0.5rem 0;
    border-radius: 5px;
    font-size: 1.2rem;
`;

interface UserListProps {
    token: Tokens;
    setToken: Dispatch<SetStateAction<Tokens>>;
}

interface Users {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
}

const UserList: React.FC<UserListProps> = ({ token, setToken }) => {
    const [users, setUsers] = useState<Users[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {

        setError(null);

        const accessTokenHasExpired = () => {
            if (!token.accessToken) return true;
            const now = new Date();
            const expirationDate = new Date(token.accessToken.expireAt);
            return now >= expirationDate;
        };
    
        const refreshTokenHasExpired = () => {
            if (!token.refreshToken) return true;
            const now = new Date();
            const expirationDate = new Date(token.refreshToken.expireAt);
            return now >= expirationDate;
        };

        // if (accessTokenHasExpired) {
        //     refreshTokenHasExpired ? navigate('/login') : await refreshAccessToken;
        // }
        
        const getUsers = async () => {
            try {
                if (!token.accessToken) throw new Error('Access token not available.');
                const response = await axios.get<Users[]>('https://sphenery.com/users', {
                    headers: {
                        Authorization: `Bearer ${token.accessToken.token}`,
                    }
                });

                setUsers(response.data);

            } catch (error:any) {
                if (error.response && error.response.status === 401) {
                    refreshAccessToken();
                } else {
                    setError(error.response?.data?.message || 'Unknown Error');
                }
            }
        };

        const refreshAccessToken = async () => {
            try {
                if (!token.refreshToken) throw new Error('Refresh token not available.');
                const response = await axios.post<Tokens>('https://sphenery.com/auth/login-refresh', { token: token.refreshToken.token },
                    {
                        headers: {
                            AuthKey: process.env.REACT_APP_AUTH_KEY,
                            'Authorization': `Bearer ${token.refreshToken.token}`,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                });
                setToken({
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken,
                });
            } catch (error: any) {
                setError( error.response?.data?.message ? 'Getting users failed: ' + error.response.data.message : 'Unknown Error' );
            }
        };

        if (accessTokenHasExpired()) {
            if (refreshTokenHasExpired()) {
              navigate('/login');
            } else {
              refreshAccessToken();
            }
          }

        getUsers();
    }, [token, setToken, navigate]);

    return (
        <Container>
            <p><a href="/login">← Back to Login</a></p>
            <Title>Users ({users.length})</Title>
            {users.map(user => (
                <User key={user.id}>
                    <p>{user.id}</p>
                    <p>{user.username}</p>
                    <p>{user.firstName}</p>
                    <p>{user.lastName}</p>
                </User>
            ))}
            {error && <Toast message={error} />}
        </Container>
    );
}

export default UserList;
