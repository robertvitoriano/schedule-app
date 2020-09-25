  
import { BrowserRouter , Switch, Route } from "react-router-dom";
import React from 'react'
import Login from './pages/Login';
import Home from './pages/Home';
import SignUp from './pages/SignUp'
import NewNote from './pages/NewNote';
import UpdateNote from './pages/UpdateNote'
import Categories from './pages/Categories'


export default function Routes() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/user/signup" component={SignUp} />
          <Route path="/user/:userId" component={Home} />
          <Route path="/:userId/categories" component={Categories} />
          <Route path="/:userId/creation" component={NewNote} />
          <Route path="/:noteId/update" component={UpdateNote} />
        </Switch>
      </BrowserRouter>
    );

}