import { BrowserRouter, Switch, Route } from "react-router-dom";
import React from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Tasks from './pages/Task';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} /> 
        <Route path="/home" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/tasks" component={Tasks} />
      </Switch>
    </BrowserRouter>
  );
}
