import React, { useState } from 'react';
import axios from 'axios';
import Toast from './Toast';
import { Tokens } from '../App';

interface LoginProps {
    setToken: React.Dispatch<React.SetStateAction<Tokens>>;
}

interface Credentials {
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
    const [credentials, setCredentials] = useState<Credentials>({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
    });
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
        ...credentials,
        [e.target.name]: e.target.value,
        });
    };

    const registerUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError(null);

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
            setError(response.data)
        } catch (error: any) {
            setError('Register failed: ' + error.response.data + ' ' +error.response.data.message);
        }
    };

    const loginUser = async (event: React.FormEvent<HTMLFormElement>) => {
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
        } catch (error: any) {
            setError( error.response.data.message ? 'Login failed: ' + error.response.data.message : '' );
        }
    };

    return (
    <div className="section">
		<div className="container">
			<div className="section-wrapper">
				<div className="section pb-5 pt-5 pt-sm-2 text-center">
					<h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
		<input className="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
		<label htmlFor="reg-log"/>
						<div className="card-3d-wrap">
							<div className="card-3d-wrapper">
								<div className="card-front login">
									<form className="center-wrap" onSubmit={loginUser}>
										<div className="section text-center">
											<div className="form-group">
                                                    <input type="email" className="form-style"
                                                        name="username" placeholder="Email"
                                                        onChange={handleInputChange} required/>
												<i className="input-icon uil uil-at"></i>
											</div>	
                                                <div className="form-group">
                                                    <input type="password" name="password" className="form-style" placeholder="Password"
                                                    onChange={handleInputChange} required/>
												<i className="input-icon uil uil-lock-alt"/>
											</div>
                                                <button className="btn" type="submit" >Login</button>
                                                
				      					</div>
			      					</form>
			      				</div>
								<div className="card-back register" >
									<form className="center-wrap" onSubmit={registerUser}>
										<div className="section text-center">
											<div className="form-group">
                                                <input type="text" className="form-style" placeholder="First Name"
                                                    required
                                                        name="firstName"
                                                        onChange={handleInputChange}
                                                    />
												<i className="input-icon uil uil-user"/>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-style" placeholder="Last Name"
                                                    required
                                                        name="lastName"
                                                        onChange={handleInputChange}
                                                    />
												<i className="input-icon uil uil-user"/>
											</div>	
											
                      <div className="form-group ">
                                                    <input type="email" className="form-style" placeholder="Email"
                                                    name="username" required onChange={handleInputChange} />
												<i className="input-icon uil uil-at"></i>
											</div>
											<div className="form-group ">
                                                    <input type="password" className="form-style" placeholder="Password"
                                                    name="password"  required onChange={handleInputChange}/>
												<i className="input-icon uil uil-lock-alt"></i>
											</div>
                                                <button type="submit" className="btn">Register</button>
                                                
				      					</div>
			      					</form>
			      				</div>
			      			</div>
			      		</div>
			      	</div>
                    </div>
                    {error && <Toast message={error} />}
            </div>
            <div id="signature">
            <a href="https://www.kalecream.com">K.</a>
            </div>
    </div> 
    );
}

export default Login;
