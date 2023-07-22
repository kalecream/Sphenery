import React, {  useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import UserList from './components/Users';

export interface Tokens {
    accessToken: { token: string; expireAt: string; } | null;
    refreshToken: { token: string; expireAt: string; } | null ;
}


function App() {
    const [token, setToken] = useState<Tokens>({
        accessToken: null,
        refreshToken: null,
    });

    const LoginPage = () => (token.accessToken?.token ? <Navigate to="/users" /> : <Login setToken={setToken} />);
    const UsersPage = () => (token && token.refreshToken && token.accessToken!.token ? <UserList token={token} setToken={setToken} /> : <Navigate to="/login" />);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/users" element={<UsersPage />} /> 
                <Route path="/" element={<Navigate to="/users" />} />
            </Routes>
        </Router>
    );
}

export default App;


