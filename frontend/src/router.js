  
import { BrowserRouter , Switch, Route } from "react-router-dom";
import React from 'react'
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp'



export default function Routes() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/user/signup" component={SignUp} />
          <Route path="/user/:userId" component={Home} />
        </Switch>
      </BrowserRouter>
    );

}