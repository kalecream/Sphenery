// src/components/Register.js

import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const registerUser = async () => {
        try {
            const response = await axios.post('https://sphenery.com/register', {
                email,
                password,
                first_name: firstName,
                last_name: lastName
            }, {
                headers: {
                    AuthKey: process.env.AuthKey
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <input type="text" placeholder="First Name" onChange={e => setFirstName(e.target.value)} />
            <input type="text" placeholder="Last Name" onChange={e => setLastName(e.target.value)} />
            <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button onClick={registerUser}>Register</button>
        </div>
    );
}

export default Register;
