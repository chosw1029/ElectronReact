import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "../Screens/Home";
import Login from "../Screens/Login";

// Components/Routes.js 로 이동
export default () => (
  <BrowserRouter>
    <Switch>
    <Route path="/home" component={Home} />
    <Route path="/" component={Login} /> 
    </Switch>
  </BrowserRouter>
)