import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import { Route } from 'react-router-dom'
import Login2 from './pages/Login2'

const LoginRoute = () => {
    return <>
    <Route path={"/register"}>
        <Register />
    </Route>
    <Route path={"/login"}>
        <Login />
    </Route>
    <Route path={"/login2"}>
        <Login />
    </Route>
    </>
}

export default LoginRoute