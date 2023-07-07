import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import UserList from './components/Users';

function App() {
    const [token, setToken] = useState({
        accessToken: null,
        refreshToken: null,
    });

    return (
        <Router>
            <Routes>
                <Route path="/register" element={token ? <Navigate to="/users" /> : <Register />} />
                <Route path="/login" element={token ? <Navigate to="/users" /> : <Login setToken={setToken} />} />
                <Route path="/users" element={token ? <UserList token={token} setToken={setToken} /> : <Navigate to="/login" />} />
                <Route path="/" element={token ? <Navigate to="/users" /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
