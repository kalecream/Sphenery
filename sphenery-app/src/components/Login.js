// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';

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
        <div>
            <h1>Login</h1>
            <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button onClick={loginUser}>Login</button>
        </div>
    );
}

export default Login;
