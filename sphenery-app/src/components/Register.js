import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const registerUser = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://sphenery.com/auth/register', {
                username,
                password,
                firstName: firstName,
                lastName: lastName
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
        <Container>
            <h1>Register</h1>
            <Form onSubmit={registerUser}>
                <Input type="text" placeholder="First Name" required onChange={e => setFirstName(e.target.value)} />
                <Input type="text" placeholder="Last Name" required onChange={e => setLastName(e.target.value)} />
                <Input type="email" placeholder="Email" required onChange={e => setUsername(e.target.value)} />
                <Input type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
                <Button type="submit">Register</Button>
            </Form>
        </Container>
    );
}

export default Register;
