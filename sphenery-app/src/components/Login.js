// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styles

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f8f9fa;
    padding: 20px;
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

// Component

function Login({ setToken }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async () => {
        try {
            const response = await axios.post('https://sphenery.com/login', {
                email,
                password
            }, {
                headers: {
                    AuthKey: process.env.AuthKey
                }
            });
            setToken(response.data.token);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <h1>KaleCream</h1>
            <Input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <Button onClick={loginUser}>Login</Button>
        </Container>
    );
}

export default Login;
