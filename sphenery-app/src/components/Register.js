import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Toast from './Toast';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: #fff;
  background-color: #007BFF;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

function Register() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
    });

    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setCredentials({
        ...credentials,
        [e.target.name]: e.target.value,
        });
    };

    const registerUser = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://sphenery.com/auth/register', {
                 username: credentials.username, 
                password: credentials.password,
                firstName: credentials.firstName,
                lastName: credentials.lastName,
            }, {
                headers: {
                    AuthKey: process.env.REACT_APP_AUTH_KEY,
                    'Accept': 'text/plain',
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
        } catch (error) {
            setError('Login failed: ' + error.response.data + ' ' +error.response.data.message);
        }
    };

    return (
        <Container>
            <h1>Register</h1>
            <Form onSubmit={registerUser}>
                <Input type="text" placeholder="First Name" name="firstName" required onChange={handleInputChange} />
                <Input type="text" placeholder="Last Name" name="lastName" required onChange={handleInputChange} />
                <Input type="email" placeholder="Email" name="username" required onChange={handleInputChange} />
                <Input type="password" placeholder="Password" name="password"  required onChange={handleInputChange} />
                <Button type="submit">Register</Button>
                {error && <Toast message={error} />}
            </Form>
        </Container>
    );
}

export default Register;
