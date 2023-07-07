// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Toast from './Toast';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f8f9fa;
    padding: 20px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    max-width: 300px;
`;

export const Input = styled.input`
    margin: 10px 0;
    padding: 10px;
    width: 80%;
    max-width: 300px;
    border-radius: 4px;
    border: 1px solid #ddd;
`;

export const Button = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    width: 80%;
    max-width: 300px;
    border: none;
    border-radius: 4px;
    color: #fff;
    background: #007bff;
    cursor: pointer;
    
    &:hover {
        background: #0056b3;
    }
`;

function Login({ setToken }) {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setCredentials({
        ...credentials,
        [e.target.name]: e.target.value,
        });
    };

    const loginUser = async (event) => {
        event.preventDefault();

        setError(null);

        try {
            const response = await axios.post('https://sphenery.com/auth/login', {
                username: credentials.username, 
                password: credentials.password,
            }, {
                headers: {
                    AuthKey: process.env.REACT_APP_AUTH_KEY,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            setToken({ accessToken: response.data.accessToken, refreshToken: response.data.refreshToken });
        } catch (error) {
            setError('Login failed: ' + error.response.data.message);
        }
    };

    return (
        <Container>
            <h1>Swagger</h1>
            <Form onSubmit={loginUser}>
                <Input type="email" name="username" placeholder="Email" onChange={handleInputChange} required />
                <Input type="password" name="password" placeholder="Password" onChange={handleInputChange} required />
                <Button type="submit">Login</Button>
            </Form>
            {error && <Toast message={error} />}
        </Container>
    );
}

export default Login;
