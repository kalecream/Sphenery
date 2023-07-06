// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import UserList from './components/UserList';

function App() {
    const [token, setToken] = useState(null);

    return (
        <Router>
            <Switch>
                <Route path="/register">
                    {token ? <Redirect to="/users" /> : <Register />}
                </Route>
                <Route path="/login">
                    {token ? <Redirect to="/users" /> : <Login setToken={setToken} />}
                </Route>
                <Route path="/users">
                    {token ? <UserList token={token} setToken={setToken} /> : <Redirect to="/login" />}
                </Route>
                <Route path="/">
                    {token ? <Redirect to="/users" /> : <Redirect to="/login" />}
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
