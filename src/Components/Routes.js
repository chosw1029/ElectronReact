import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from "../Screens/Home";
import Login from "../Screens/Login";

// Components/Routes.js 로 이동
export default () => (
  <Router>
    <Route exact path="/" component={Login} /> 
    <Route exact path="/home" component={Home} />
  </Router>
)