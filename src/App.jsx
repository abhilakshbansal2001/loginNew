import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";
import { BrowserRouter as Router , Switch } from 'react-router-dom'
import LoginRoute from "./LoginRoute";
import 'react-toastify/dist/ReactToastify.css';
import { Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Activation from "./pages/Activation";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Login2 from "./pages/Login2";

const App = () => (

  <Router>
    <Switch>

      <Route exact path={"/"}>
        <h1>/ Route</h1>
      </Route>

      <Route path={"/register"}>
        <Register />
      </Route>

      <Route path={"/login"}>
        <Login /> 
      </Route>

      <Route path={"/activation"}>
        <Activation /> 
      </Route> 

      <Route path={"/forgotPassword"}>
        <ForgotPassword /> 
      </Route> 

      <Route path={"/resetPassword"}>
        <ResetPassword /> 
      </Route> 
      <Route path={"/login2"}>
        <Login2 /> 
      </Route> 



    </Switch>
  </Router>
   

);
ReactDOM.render(<App />, document.getElementById("app"));
