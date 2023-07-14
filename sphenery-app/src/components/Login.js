// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import Toast from './Toast';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

function Login({ setToken }) {
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

    const SplitName = (credentials) => {
        const inputString = credentials.firstName;
        const nameParts = inputString.split(' ');

        if (nameParts.length >= 2) {
            setCredentials({
                ...credentials,
                firstName: nameParts[0],
                lastName: nameParts[-1]
            })
        } 
    }

    const registerUser = async (event) => {
        event.preventDefault();

        setError(null);
        SplitName(credentials);

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
        } catch (error) {
            setError('Register failed: ' + error.response.data + ' ' +error.response.data.message);
        }
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
            setError( error.response.data.message ? 'Login failed: ' + error.response.data.message : '' );
        }
    };

    return (
        <Container>
            <div class="section">
		    <div class="container">
				<div class="section-wrapper">
					<div class="section pb-5 pt-5 pt-sm-2 text-center">
						<h6 class="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
			          	<input class="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
			          	<label for="reg-log"></label>
						<div class="card-3d-wrap mx-auto">
							<div class="card-3d-wrapper">
								<div class="card-front login">
									<form class="center-wrap" onSubmit={loginUser}>
										<div class="section text-center">
											<div class="form-group">
                                                    <input type="email" class="form-style"
                                                        name="username" placeholder="Email"
                                                        onChange={handleInputChange} required/>
												<i class="input-icon uil uil-at"></i>
											</div>	
                                                <div class="form-group">
                                                    <input type="password" name="password" class="form-style" placeholder="Password"
                                                    onChange={handleInputChange} required/>
												<i class="input-icon uil uil-lock-alt"/>
											</div>
                                                <button class="btn" type="submit" >Login</button>
                                                
				      					</div>
			      					</form>
			      				</div>
								<div class="card-back register" onSubmit={registerUser}>
									<div class="center-wrap">
										<form class="section text-center">
											<div class="form-group">
                                                    <input type="text" class="form-style" placeholder="Full Name"
                                                        name="firstName"
                                                        onChange={handleInputChange}
                                                    />
												<i class="input-icon uil uil-user"/>
											</div>	
											
                      <div class="form-group ">
                                                    <input type="email" class="form-style" placeholder="Email"
                                                    name="username" required onChange={handleInputChange} />
												<i class="input-icon uil uil-at"></i>
											</div>
											<div class="form-group ">
                                                    <input type="password" class="form-style" placeholder="Password"
                                                    name="password"  required onChange={handleInputChange}/>
												<i class="input-icon uil uil-lock-alt"></i>
											</div>
                                                <button type="submit" class="btn">Register</button>
                                                
				      					</form>
			      					</div>
			      				</div>
			      			</div>
			      		</div>
			      	</div>
                    </div>
                    {error && <Toast message={error} />}
            </div>
        </div> 
        </Container>
    );
}

export default Login;
